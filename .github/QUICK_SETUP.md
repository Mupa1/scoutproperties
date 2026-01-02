# Quick Setup Checklist for GitHub Actions

> **📖 Which guide to use?**
>
> - **Start here** if you're comfortable with SSH and GitHub (5-minute setup)
> - **Use `SETUP_GITHUB_ACTIONS.md`** if you're new to this or need detailed explanations
> - **Refer to `SETUP_GITHUB_ACTIONS.md`** if you run into any issues

## ✅ Pre-Setup Checklist

- [ ] You have SSH access to your Hostinger VPS
- [ ] Your application is already cloned on the VPS
- [ ] Git is configured on the VPS
- [ ] Node.js (v18+) and Yarn are installed on VPS
- [ ] Your services are running (PM2/Docker/systemd)

## 🚀 Setup Steps (5 minutes)

### 1. Generate SSH Key (Local Machine)

```bash
ssh-keygen -t rsa -b 4096 -C "github-actions" -f ~/.ssh/github_actions_deploy
# Press Enter when asked for passphrase (leave empty)
```

### 2. Add Public Key to VPS

```bash
# Copy public key
cat ~/.ssh/github_actions_deploy.pub

# SSH into VPS and add key
ssh user@your-vps-ip
mkdir -p ~/.ssh
echo "PASTE_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
exit
```

### 3. Add GitHub Secrets

Go to: **Repository → Settings → Secrets and variables → Actions**

Add these secrets:

| Secret         | Value                                                   |
| -------------- | ------------------------------------------------------- |
| `VPS_HOST`     | Your VPS IP (e.g., `123.45.67.89`)                      |
| `VPS_USER`     | SSH username (e.g., `root`)                             |
| `VPS_SSH_KEY`  | Content of `~/.ssh/github_actions_deploy` (private key) |
| `VPS_PORT`     | `22` (standard SSH port - see note below)               |
| `VPS_APP_PATH` | Full path on VPS (e.g., `/var/www/scoutproperties`)     |

**To get private key:**

```bash
cat ~/.ssh/github_actions_deploy
# Copy everything including -----BEGIN and -----END lines
```

**To find your VPS SSH port:**

- **Port 22 is standard** - Most VPS providers use port 22 by default
- **Check Hostinger panel**: VPS → Server Details → SSH Port
- **Or test connection**: If you can SSH without specifying a port, it's likely 22
- **Check SSH config on VPS**: `sudo grep Port /etc/ssh/sshd_config` (usually shows `#Port 22` or `Port 22`)

### 4. Test Deployment

```bash
# Make a small change
echo "# Test" >> README.md
git add .
git commit -m "Test GitHub Actions deployment"
git push origin main
```

### 5. Check Results

- Go to **Actions** tab in GitHub
- Watch the deployment progress
- Check your VPS to verify it worked

## 🎉 Done!

Now every push to `main` or `master` will automatically deploy to your VPS!

## 🔧 Troubleshooting

**"Permission denied"**

- Check: `chmod 600 ~/.ssh/authorized_keys` on VPS
- Verify public key was added correctly

**"Application directory not found"**

- Use absolute path in `VPS_APP_PATH` (e.g., `/var/www/scoutproperties`)
- Don't use `~` or relative paths

**"Command not found: yarn"**

- Install yarn: `npm install -g yarn`
- Or add full path to yarn in workflow

## 📚 Full Documentation

See `.github/SETUP_GITHUB_ACTIONS.md` for detailed instructions.
