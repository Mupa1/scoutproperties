# GitHub Actions Deployment Setup Guide

Follow these steps to set up automated deployment to your Hostinger VPS using GitHub Actions.

## Step 1: Generate SSH Key Pair

On your **local machine**, generate a new SSH key pair for GitHub Actions:

```bash
ssh-keygen -t rsa -b 4096 -C "github-actions-deploy" -f ~/.ssh/github_actions_deploy
```

**Important**: Don't set a passphrase (press Enter when prompted) to allow automated deployment.

## Step 2: Add Public Key to VPS

Copy the **public key** to your VPS:

```bash
# Display the public key
cat ~/.ssh/github_actions_deploy.pub

# Copy the output, then SSH into your VPS
ssh user@your-vps-ip

# On your VPS, add the key to authorized_keys
mkdir -p ~/.ssh
echo "PASTE_YOUR_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

Or use `ssh-copy-id`:

```bash
ssh-copy-id -i ~/.ssh/github_actions_deploy.pub user@your-vps-ip
```

## Step 3: Test SSH Connection

Test that the SSH key works:

```bash
ssh -i ~/.ssh/github_actions_deploy user@your-vps-ip
```

If it works, you can exit: `exit`

## Step 4: Add GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add each of these:

### Required Secrets:

| Secret Name    | Description                              | Example Value                                              |
| -------------- | ---------------------------------------- | ---------------------------------------------------------- |
| `VPS_HOST`     | Your VPS IP address or domain            | `123.45.67.89` or `vps.yourdomain.com`                     |
| `VPS_USER`     | SSH username                             | `root` or `ubuntu`                                         |
| `VPS_SSH_KEY`  | **Private key content** (the entire key) | Content of `~/.ssh/github_actions_deploy`                  |
| `VPS_PORT`     | SSH port (optional, defaults to 22)      | `22` (see note below)                                      |
| `VPS_APP_PATH` | Full path to your app on VPS             | `/var/www/scoutproperties` or `/home/user/scoutproperties` |

### How to get the private key:

```bash
# On your local machine
cat ~/.ssh/github_actions_deploy

# Copy the ENTIRE output including:
# -----BEGIN OPENSSH PRIVATE KEY-----
# ... (all the content)
# -----END OPENSSH PRIVATE KEY-----
```

**⚠️ Important**: Copy the entire private key including the header and footer lines.

### How to find your VPS SSH port:

- **Port 22 is standard** - Most VPS providers (including Hostinger) use port 22 by default
- **Check Hostinger panel**:
  - Log into Hostinger → VPS → Your Server → Server Details
  - Look for "SSH Port" or "Port" in the connection details
- **If you can SSH without specifying a port**, it's using the default (22)
- **Check on your VPS** (if you have access):
  ```bash
  sudo grep Port /etc/ssh/sshd_config
  # Usually shows: #Port 22 (commented = default 22) or Port 22
  ```
- **If you changed it for security**, use that custom port number

**Note**: If you're unsure, try `22` first - it's the standard and most common.

## Step 5: Verify Your VPS Setup

Make sure on your VPS:

1. **Git is initialized** in your app directory:

   ```bash
   cd /path/to/scoutproperties
   git remote -v  # Should show your GitHub repo
   ```

2. **Yarn is installed**:

   ```bash
   yarn --version
   ```

3. **Node.js is installed** (v18+):

   ```bash
   node --version
   ```

4. **PM2, Docker, or systemd** is set up (for service management)

## Step 6: Test the Deployment

1. Make a small change to your code
2. Commit and push to `main` or `master`:

   ```bash
   git add .
   git commit -m "Test deployment"
   git push origin main
   ```

3. Go to **Actions** tab in GitHub to see the deployment progress

4. Check your VPS to verify the deployment worked

## Troubleshooting

### Deployment fails with "Permission denied"

- Check SSH key permissions on VPS: `chmod 600 ~/.ssh/authorized_keys`
- Verify the public key was added correctly
- Check VPS user has access to the application directory

### "Application directory not found"

- Verify `VPS_APP_PATH` secret matches the actual path on your VPS
- Use absolute path: `/home/user/scoutproperties` not `~/scoutproperties`

### "Command not found: yarn"

- Install yarn on VPS: `npm install -g yarn`
- Or use full path: `/usr/bin/yarn` or `/usr/local/bin/yarn`

### Services not restarting

- Check if PM2 is installed: `pm2 --version`
- Or use Docker: `docker-compose --version`
- Or check systemd: `systemctl status scoutproperties`

### Build fails

- Check Node.js version: `node --version` (should be 18+)
- Check disk space: `df -h`
- Check logs in GitHub Actions output

## Manual Deployment (Fallback)

If GitHub Actions fails, you can still deploy manually:

```bash
ssh user@your-vps-ip
cd /path/to/scoutproperties
git pull origin main
cd server && yarn install && yarn build && cd ..
cd client && yarn install && yarn build && cd ..
pm2 restart all  # or your restart command
```

## Security Notes

- ✅ The private key is stored securely in GitHub Secrets
- ✅ Only authorized users with repository access can trigger deployments
- ✅ SSH keys are more secure than passwords
- ⚠️ Consider using a dedicated deployment user (not root) on your VPS
- ⚠️ Regularly rotate your SSH keys

## Next Steps

After setup:

1. Test with a small change
2. Monitor the first few deployments
3. Set up notifications (optional) in GitHub Actions settings
4. Consider adding deployment status badges to your README
