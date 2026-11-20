# My Project — Tournament Website

A static HTML/CSS/JavaScript tournament website with a separate admin area, Supabase Auth/Postgres/RLS, and Netlify hosting.

## Structure

- `/` — public website
- `/matches.html` — published match schedule
- `/champion.html` — published champions
- `/admin/login.html` — admin sign-in
- `/admin/dashboard.html` — admin dashboard
- `/admin/matches.html` — match CRUD and publishing
- `/admin/champion.html` — champion CRUD and publishing
- `/supabase/schema.sql` — tables, indexes, RLS policies and admin helper

## 1. Create Supabase project

1. Create a Supabase project.
2. Open **SQL Editor** and run `supabase/schema.sql`.
3. In **Project Settings → API**, copy the Project URL and publishable key (older projects may label it `anon`).
4. Paste them into `js/config.js`.
5. In **Authentication → Providers**, ensure Email is enabled.
6. In **Authentication → URL Configuration**, add your Netlify site URL to Site URL and Redirect URLs as appropriate.

## 2. Create the first admin

1. In Supabase **Authentication → Users**, create an admin user with an email and password.
2. Copy that user's UUID.
3. In SQL Editor run (replace the placeholder with the UUID):

```sql
insert into public.profiles (user_id, role)
values ('YOUR_AUTH_USER_UUID', 'admin');
```

Do not give users a way to update their own `profiles.role`. Do not expose the service-role key in browser code. Create additional admins only through a trusted project-owner process.

## 3. Run locally

Use a local static web server; do not open HTML files directly with `file://`, because browser ES modules require HTTP.

For example, with Node installed:

```bash
npx serve .
```

Open the local URL printed by the server. Configure the local URL in Supabase Auth URL settings if your auth flow needs it.

## 4. Deploy to Netlify

1. Push the complete folder to a GitHub repository.
2. In Netlify choose **Add new site → Import an existing project**.
3. Connect the repository.
4. Build command: leave empty.
5. Publish directory: `.`.
6. Deploy.
7. Add the deployed URL to Supabase Auth URL Configuration.

The admin panel is a separate route, not a separate security boundary: `/admin/login.html`. Actual authorization is enforced by Supabase Auth and RLS.

## Security notes

- Browser code uses only the Supabase publishable/anon key. This key is designed to be public; RLS is mandatory.
- Never put a service-role or secret key in `js/config.js`, HTML, JavaScript, or Git.
- RLS allows anonymous visitors to SELECT only published matches and champions.
- Only authenticated users whose profile role is `admin` can manage all match and champion rows.
- Profile roles are not user-editable through client policies. Protect Supabase owner access and admin account credentials.
- The admin route guard improves navigation UX but is not the security boundary. RLS is the enforcement layer.
- This starter does not include password reset, email invitations, image uploads, audit logs, or custom domain configuration.
- Review Supabase Auth settings, database backups, and production security before launch.
