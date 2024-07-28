# Myntenance

> Your next side project won't fail this time 💡

## What is Myntenance?

Myntenance is a tool that helps you keep track of your side projects along with your plans and ideas. It's a simple way to keep your projects organized and make sure you don't forget about them.

Give it a try at [https://myntenance.vercel.app/](https://myntenance.vercel.app/).

Curious about the story behind the project? Watch the presentation at [https://youtu.be/QLOPQOUqw2U](https://youtu.be/QLOPQOUqw2U).

## Roadmap

High level roadmap of the project, subejct to change and feedback.

- [x] Login with GitHub
- [x] Select projects to track
- [x] Store project on Supabase
- [x] Projects list
  - [x] Star favourite projects
  - [ ] Filters/Sorting
- [x] Deploy on Vercel
- [ ] Project page
  - [x] Project details
  - [ ] Tasks List
    - [x] Add/Edit/Remove
    - [x] Check Completed
    - [x] Hide completed
    - [ ] Sort/Reorder (priority?)
  - [ ] Realtime textarea?
  - [x] Delete
- [ ] Task page
  - [x] Parallel modal
  - [ ] Assign issues/prs
  - [ ] Due date
- [ ] Tags (projects, tasks)
- [ ] Landing page
- [ ] Onboarding (driver.js?)
- [ ] Create GitHub Issue from the tool
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
