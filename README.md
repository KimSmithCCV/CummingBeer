# Cumming Beer website

Static site, no build step. Structure:

```
index.html      the whole page
css/style.css   all styles
js/script.js    age gate, beer modal, eNews form
images/         every photo, can render, and texture used on the page
```

## Preview locally

Open `index.html` directly in a browser, or serve the folder so relative
paths behave exactly like they will on GitHub Pages:

```
npx serve .
```

## Before launch

- FormSubmit.co sends a confirmation email to Info@CummingBeer.com the first
  time the eNews form is submitted — someone needs to click "Confirm my
  email" in that message or submissions will silently fail.

## Deploy to GitHub Pages

1. `git init`, commit everything in this folder, push to a new GitHub repo.
2. In the repo's Settings → Pages, set the source to the `main` branch, root
   folder.
3. GitHub gives you a `https://<username>.github.io/<repo>/` URL. Point your
   domain at it (or use it as-is) once you're happy with it.
