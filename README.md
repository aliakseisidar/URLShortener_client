# _[TBC]_

---

### "URL Shortener" learning project (e2e automation)

_by Sidar Aliaksei_

**_[Back-end part (Node.js)](https://github.com/aliakseisidar/URLShortener_server)_**

---

To srart app:

```
npm start
```

To srart tests:

```
npx wdio run ./wdio.conf.js
```

---

#### Library used:

- WebDriverIO
- Allure Reporter
- etc.

---

#### Scenarios:

<details>
  <summary>Sign In (positive)</summary>

### Before:

1. no

### Steps:

1. Open Login page.
2. Fill Sign Uo form.
3. Click Sing Up.
4. Click Log Out.

### After:

1. Delete a user.

## </details>

<details>
  <summary>User flow (Happy Path)</summary>
  
### Before:

1. Sign Up a new user

### Steps:

1. Open LogIn page.
2. Fill LogIn form.
3. Click LogIn.
4. Short any URL (wiki/google/github)
5. View the URL details.
6. Add tag to the URL.
7. Try the URL.
8. Delete the URL.

### After:

1. Delete a user.

## </details>

<details>
  <summary>Search by Title/Tag</summary>
  
### Before:

1. Sign Up a new user
2. Add some URLs.

### Steps:

1. Open LogIn page.
2. Fill Search input with valid Title.
3. Click on Tag.

### After:

1. Delete a user.
2. Delete all his URLs.

## </details>

<details>
  <summary>Admin flow (Happy Path)</summary>
  
### Before:

1. Sign Up a new user
2. Add some URLs.
3. Sign In as admin (predefined)

### Steps:

1. Change user
2. Delete user

### After:

1.

## </details>
