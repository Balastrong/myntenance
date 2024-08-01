"use server";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../supabase/server";
import {
  GITHUB_REFRESH_TOKEN_COOKIE,
  GITHUB_ACCESS_TOKEN_COOKIE,
} from "../supabase/cookies";

export async function refreshToken(
  request: NextRequest,
  response: NextResponse,
) {
  "use server";

  if (request.nextUrl.pathname.startsWith("/auth")) {
    return response;
  }

  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // User is not logged in, nothing to do here
    return response;
  }

  const cookieStore = cookies();

  const accessToken = cookieStore.get(GITHUB_ACCESS_TOKEN_COOKIE)?.value;

  // User has access token, nothing to do here
  if (accessToken) return response;

  // If secrets to refresh token are not set, just logout user (should only happen in development)
  if (!process.env.GITHUB_CLIENT_SECRET || !process.env.GITHUB_CLIENT_ID) {
    return logout(request);
  }

  const refreshToken = cookieStore.get(GITHUB_REFRESH_TOKEN_COOKIE)?.value;

  if (!refreshToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/signout";
    return NextResponse.redirect(url);
  }

  const params = new URLSearchParams({
    refresh_token: refreshToken,
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    grant_type: "refresh_token",
  });

  const refreshRawResponse = await fetch(
    `https://github.com/login/oauth/access_token?${params}`,
    { method: "POST" },
  );

  if (!refreshRawResponse.ok) {
    return logout(request);
  }

  const refreshResponse = new URLSearchParams(await refreshRawResponse.text());

  if (refreshResponse.has("error")) {
    return logout(request);
  }

  const newAccessToken = refreshResponse.get("access_token");
  const newRefreshToken = refreshResponse.get("refresh_token");

  if (!newAccessToken || !newRefreshToken) {
    return logout(request);
  }

  response.cookies.set(GITHUB_ACCESS_TOKEN_COOKIE, newAccessToken);
  response.cookies.set(GITHUB_REFRESH_TOKEN_COOKIE, newRefreshToken);

  return response;
}

function logout(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/auth/signout";
  return NextResponse.redirect(url);
}
