
# Project Documentation: Social Media / Bookmarks App

**Date:** December 7, 2025
**Environment:** Ubuntu (HP-ProBook), Docker, Nginx, Django 3.11-slim
**Repository:** `https://github.com/mtdk-mitthu/socialm`

## 1\. Project Initialization

The project started as a root-level Django project named `socialm` but was later restructured into a subdirectory named `bookmarks`.

### Initial Setup Commands

1.  **Build Containers:**
    ```bash
    docker-compose build
    ```
2.  **Create Django Project:**
    ```bash
    docker-compose run --rm web django-admin startproject socialm .
    ```
3.  **Fix Permissions (Linux/Ubuntu specific):**
    ```bash
    sudo chown -R $USER:$USER .
    ```

## 2\. Issue Resolution Log

During the setup process, three specific errors were encountered and resolved.

### Issue A: `STATIC_ROOT` Missing

**Error:** `django.core.exceptions.ImproperlyConfigured: You're using the staticfiles app without having set the STATIC_ROOT setting to a filesystem path.`
**Cause:** The `settings.py` file did not have a destination folder defined for `collectstatic`.
**Resolution:**
The settings were updated (presumably via code editor) to include `STATIC_ROOT`.
**Verification:**

```bash
docker-compose exec web python manage.py collectstatic --noinput
# Result: 127 static files copied.
```

### Issue B: YAML Syntax Errors

**Error:** `yaml.scanner.ScannerError` and `yaml.parser.ParserError` in `docker-compose.yml`.
**Cause:** indentation errors or invalid block mappings during file editing.
**Resolution:** Corrected the indentation in `docker-compose.yml`.

### Issue C: Docker `ContainerConfig` Key Error

**Error:** `KeyError: 'ContainerConfig'` when trying to restart containers after moving files.
**Context:** This occurred after moving the Django project files into the new `bookmarks/` directory. Docker tried to reuse old containers that no longer matched the build context.
**Resolution:**
The old containers were forcibly removed to allow a clean rebuild.

```bash
docker rm -f social_media_web_1
docker-compose down --remove-orphans
docker-compose up --build -d
```

## 3\. Project Restructuring

The project structure was changed from the root directory to a nested structure to accommodate the app naming convention change (from `socialm` to `bookmarks`).

**Operations Performed:**

1.  Created directory `bookmarks`.
2.  Moved `manage.py` inside `bookmarks/`.
3.  Moved the inner project folder `socialm` to `bookmarks/bookmarks`.
4.  Renamed the project references in `git`.

**Final File Structure (Inferred):**

```text
social_media/
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── nginx/
│   └── nginx.conf
└── bookmarks/         <-- New Root
    ├── db.sqlite3
    ├── manage.py
    └── bookmarks/     <-- Project Config
        ├── asgi.py
        ├── settings.py
        ├── urls.py
        └── wsgi.py
```

## 4\. Final Deployment Steps

Once the structure was fixed and Docker containers were rebuilt cleanly:

1.  **Database Migration:**

    ```bash
    docker-compose exec web python manage.py migrate
    ```

    *Result: Applied auth, admin, contenttypes, and sessions migrations.*

2.  **Static Files:**

    ```bash
    docker-compose exec web python manage.py collectstatic --noinput
    ```

3.  **Version Control (Git):**

      * Initialized repository.
      * Added remote `origin`.
      * Committed restructuring changes.
      * Pushed to `main`.

    <!-- end list -->

    ```bash
    git add .
    git commit -m "Change password views"
    git push origin main
    ```

## 5\. Current Status

  * **Branch:** `main`
  * **Docker Status:** Up and running (db, web, nginx).
  * **Recent Commit:** `Renamed project to bookmarks and restructured folders` (Hash: `40642c8`).


  sudo service docker restart
