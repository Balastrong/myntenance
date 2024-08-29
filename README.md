# Myntenance

> Your next side project won't fail this time 💡

## What is Myntenance?

Myntenance is a tool that helps you keep track of your side projects along with your plans and ideas. It's a simple way to keep your projects organized and make sure you don't forget about them.

Give it a try at [https://myntenance.vercel.app/](https://myntenance.vercel.app/).

Curious about the story behind the project? Watch the presentation at [https://youtu.be/QLOPQOUqw2U](https://youtu.be/QLOPQOUqw2U).

## Roadmap

Have an idea being either a tiny update or an entire new feature? Issues are more than welcome, write it down [here](https://github.com/Balastrong/myntenance/issues/new)!

Some examples:

- [ ] Add a due date to tasks
- [ ] Send a notification when a task is due
- [ ] Tags (projects, tasks)
- [ ] Onboarding (with driver.js?)
- [ ] Create a GitHub Issue from the tool
- [ ] Analytics
- [ ] Calendar

Would be cool to also explore:

- [ ] Supabase properly setup with migrations
- [ ] Chrome extension
- [ ] Gitlab integrations
- [ ] Team features

## Contributing

All kind of contributions are welcome, from ideas, bug reports, feature requests, to code contributions. Please open an issue or a PR :D

### Tech Stack

The project is a Next.js app with Supabase as the database, deployed on Vercel.

UI components are from Shadcn and customized with Tailwind.

### Local Development

1. Clone the repo
2. Install dependencies with `pnpm`
3. Create a `.env.local` file with the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://bqlqcmtccbsiocjopvas.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxbHFjbXRjY2JzaW9jam9wdmFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk4NTEyMjksImV4cCI6MjAzNTQyNzIyOX0.WSOXFefddaZUWCdvzeDfLNm8hp152ufl5R47PQbBKJ0
```

4. Run the development server with `pnpm dev`
