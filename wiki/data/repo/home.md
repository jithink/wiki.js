---
title: Configuration
description: Config Page
published: true
date: 2025-06-19T07:20:37.885Z
tags: 
editor: markdown
dateCreated: 2025-06-19T07:20:35.158Z
---



Learn how to configure Wiki.js using environment variables, the configuration file, or the setup wizard.

# Table of Contents

- [Environment Variables](#environment-variables)
- [Configuration File](#configuration-file)
- [Database Configuration](#database-configuration)
- [Authentication Setup](#authentication-setup)
- [SSL Configuration](#ssl-configuration)
- [Storage Configuration](#storage-configuration)
- [Advanced Options](#advanced-options)
- [Troubleshooting](#troubleshooting)

---

# Environment Variables

Wiki.js can be configured using environment variables. This is the recommended method for containerized deployments like Docker.

> :information_source: **Note**
> Environment variables take precedence over configuration file settings.

## Core Settings

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | HTTP port to listen on | `3000` | No |
| `CONFIG_FILE` | Path to config file | `./config.yml` | No |
| `WIKI_JS_HEROKU` | Heroku deployment flag | `false` | No |

## Database Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DB_TYPE` | Database engine | `postgres` | Yes |
| `DB_HOST` | Database hostname | `localhost` | Yes |
| `DB_PORT` | Database port | `5432` | No |
| `DB_USER` | Database username | `wikijs` | Yes |
| `DB_PASS` | Database password | - | Yes |
| `DB_NAME` | Database name | `wiki` | Yes |
| `DB_SSL` | Enable SSL connection | `false` | No |

## Example Environment Configuration

```bash
# Basic Settings
PORT=3000
NODE_ENV=production

# Database Configuration
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=wikijs
DB_PASS=your-secure-password
DB_NAME=wiki
DB_SSL=false

# Optional Settings
WIKI_JS_HEROKU=false
CONFIG_FILE=./config.yml
```

---

# Configuration File

You can also configure Wiki.js using a YAML configuration file. Create a `config.yml` file in your Wiki.js root directory.

> :warning: **Important**
> Always backup your configuration file before making changes.

## Basic Configuration File

```yaml
#######################################################################
# Wiki.js - CONFIGURATION
#######################################################################

# ---------------------------------------------------------------------
# Port the server should listen to
# ---------------------------------------------------------------------

port: 3000

# ---------------------------------------------------------------------
# Database
# ---------------------------------------------------------------------

db:
  type: postgres
  
  # PostgreSQL / MySQL / MariaDB / MS SQL Server only:
  host: localhost
  port: 5432
  user: wikijs
  pass: wikijsrocks
  db: wiki
  ssl: false
  
  # Optional - PostgreSQL / MySQL / MariaDB only:
  # schema: public
  
  # SQLite only:
  # storage: path/to/database.sqlite

# ---------------------------------------------------------------------
# SSL/TLS Settings
# ---------------------------------------------------------------------

ssl:
  enabled: false
  port: 3443
  provider: letsencrypt
  
  # Certificate format, either 'pem' or 'pfx':
  format: pem
  
  # Using PEM format:
  key: path/to/key.pem
  cert: path/to/cert.pem
  
  # Using PFX format:
  # pfx: path/to/cert.pfx
  # passphrase: pfxPassphrase
  
  # Using Let's Encrypt:
  domain: wiki.yourdomain.com
  subscriberEmail: admin@example.com

# ---------------------------------------------------------------------
# Log Level
# ---------------------------------------------------------------------

logLevel: info

# ---------------------------------------------------------------------
# Offline Mode
# ---------------------------------------------------------------------

offline: false

# ---------------------------------------------------------------------
# High-Availability
# ---------------------------------------------------------------------

ha: false

# ---------------------------------------------------------------------
# Data Path
# ---------------------------------------------------------------------

dataPath: ./data
```

---

# Database Configuration

Wiki.js supports multiple database engines. Choose the one that best fits your infrastructure.

## Supported Databases

### PostgreSQL (Recommended)

```yaml
db:
  type: postgres
  host: localhost
  port: 5432
  user: wikijs
  pass: your-password
  db: wiki
  ssl: false
  schema: public
```

### MySQL / MariaDB

```yaml
db:
  type: mysql
  host: localhost
  port: 3306
  user: wikijs
  pass: your-password
  db: wiki
  ssl: false
```

### Microsoft SQL Server

```yaml
db:
  type: mssql
  host: localhost
  port: 1433
  user: wikijs
  pass: your-password
  db: wiki
  ssl: false
```

### SQLite

```yaml
db:
  type: sqlite
  storage: path/to/database.sqlite
```

## Database Connection Pool

For production environments, configure connection pooling:

```yaml
db:
  type: postgres
  host: localhost
  port: 5432
  user: wikijs
  pass: your-password
  db: wiki
  pool:
    min: 2
    max: 10
```

---

# Authentication Setup

Configure external authentication providers for your users.

## Local Authentication

Enable local username/password authentication:

```yaml
auth:
  local:
    enabled: true
    strategy: local
```

## LDAP/Active Directory

```yaml
auth:
  ldap:
    enabled: true
    url: ldap://ldap.company.com:389
    bindDn: cn=admin,dc=company,dc=com
    bindCredentials: admin-password
    searchBase: ou=users,dc=company,dc=com
    searchFilter: (uid={{username}})
    searchAttributes:
      - displayName
      - mail
      - telephoneNumber
```

## OAuth 2.0 (Google, GitHub, etc.)

```yaml
auth:
  google:
    enabled: true
    clientId: your-google-client-id
    clientSecret: your-google-client-secret
    
  github:
    enabled: true
    clientId: your-github-client-id
    clientSecret: your-github-client-secret
```

---

# SSL Configuration

## Using Let's Encrypt

```yaml
ssl:
  enabled: true
  port: 3443
  provider: letsencrypt
  domain: wiki.yourdomain.com
  subscriberEmail: admin@yourdomain.com
```

## Using Custom Certificates

```yaml
ssl:
  enabled: true
  port: 3443
  provider: custom
  format: pem
  key: /path/to/private-key.pem
  cert: /path/to/certificate.pem
```

## Reverse Proxy Configuration

If using nginx or Apache as reverse proxy:

```yaml
ssl:
  enabled: false  # SSL handled by reverse proxy
  
# Nginx example configuration:
# server {
#   listen 443 ssl;
#   server_name wiki.yourdomain.com;
#   
#   ssl_certificate /path/to/cert.pem;
#   ssl_certificate_key /path/to/key.pem;
#   
#   location / {
#     proxy_pass http://localhost:3000;
#     proxy_set_header Host $host;
#     proxy_set_header X-Real-IP $remote_addr;
#   }
# }
```

---

# Storage Configuration

Configure where Wiki.js stores uploaded files and assets.

## Local Storage (Default)

```yaml
uploads:
  maxFileSize: 10485760  # 10MB in bytes
  maxFiles: 10
  
storage:
  disk:
    enabled: true
    path: ./data/uploads
```

## Amazon S3

```yaml
storage:
  s3:
    enabled: true
    bucket: your-s3-bucket
    region: us-east-1
    accessKeyId: your-access-key
    secretAccessKey: your-secret-key
```

## Azure Blob Storage

```yaml
storage:
  azure:
    enabled: true
    accountName: your-storage-account
    accountKey: your-account-key
    containerName: wiki-uploads
```

---

## Advanced Options

### Logging Configuration

```yaml
logLevel: info  # error, warn, info, verbose, debug, silly

logging:
  bugsnag:
    enabled: false
    key: your-bugsnag-key
    
  loggly:
    enabled: false
    token: your-loggly-token
    subdomain: your-subdomain
    
  papertrail:
    enabled: false
    host: logs.papertrailapp.com
    port: 12345
```

## Performance Tuning

```yaml
# Session Configuration
session:
  secret: your-session-secret-key
  cookie:
    secure: true  # Only for HTTPS
    maxAge: 2592000000  # 30 days in milliseconds

# Cache Configuration
redis:
  enabled: false
  host: localhost
  port: 6379
  password: null
  db: 0

# Cluster Mode
cluster:
  enabled: false
  instances: 0  # 0 = auto detect CPU cores
```

### Security Headers

```yaml
security:
  enabled: true
  hsts: true
  hstsDuration: 31536000
  csrfProtection: true
  trustProxy: false
```

---

## Troubleshooting

### Common Issues

#### Database Connection Failed

1. **Check database server status**
   ```bash
   sudo systemctl status postgresql
   ```

2. **Verify connection details**
   - Hostname and port
   - Username and password
   - Database name exists

3. **Check firewall settings**
   ```bash
   sudo ufw status
   ```

#### Port Already in Use

```bash
# Find process using port 3000
sudo lsof -i :3000

# Kill the process
sudo kill -9 <PID>
```

#### SSL Certificate Issues

1. **Verify certificate paths**
2. **Check file permissions**
   ```bash
   sudo chmod 600 /path/to/private-key.pem
   sudo chmod 644 /path/to/certificate.pem
   ```

3. **Test certificate validity**
   ```bash
   openssl x509 -in certificate.pem -text -noout
   ```

### Debug Mode

Enable debug logging to troubleshoot issues:

```yaml
logLevel: debug

# Or via environment variable
DEBUG=wiki:*
```

### Log Files

Check log files for error messages:

```bash
# System logs
sudo journalctl -u wikijs

# Application logs
tail -f /path/to/wiki/logs/wiki.log
```

---

## Related Topics

- [Installation Guide](/install)
- [Database Setup](/install/database)  
- [Authentication Providers](/auth)
- [Storage Configuration](/storage)
- [Backup and Recovery](/admin/backup)
- [Performance Optimization](/admin/performance)

---

> :bulb: **Need Help?**
> 
> - Check the [Troubleshooting Guide](/troubleshooting)
> - Visit our [Community Forum](https://github.com/Requarks/wiki/discussions)
> - Report bugs on [GitHub Issues](https://github.com/Requarks/wiki/issues)