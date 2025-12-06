# 🔍 CI/CD Troubleshooting Guide

## Current Setup
- Repository: https://github.com/SahanHasintha/supermarket-web
- EC2 IP: 15.134.39.65
- Deploy Location: /var/www/supermarket

---

## ✅ Step-by-Step Verification Checklist

### 1. Verify GitHub Secrets

Go to: https://github.com/SahanHasintha/supermarket-web/settings/secrets/actions

You should have 4 secrets:

- [ ] `SSH_PRIVATE_KEY` - Contains full private key with BEGIN/END lines
- [ ] `EC2_HOST` - Value: `15.134.39.65`
- [ ] `EC2_USERNAME` - Value: `ubuntu`
- [ ] `EC2_TARGET_DIR` - Value: `/var/www/supermarket`

**How to verify EC2_HOST, EC2_USERNAME, EC2_TARGET_DIR values:**
You can't see the values after adding, but check:
- They show "Updated X minutes ago"
- No errors when accessing them

---

### 2. Generate Correct SSH Key on EC2

**☁️ ON EC2 - Run these commands:**

```bash
# Generate new key
ssh-keygen -t ed25519 -C "github-deploy" -f ~/.ssh/github-deploy -N ""

# Add to authorized_keys
cat ~/.ssh/github-deploy.pub >> ~/.ssh/authorized_keys

# Set permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
chmod 600 ~/.ssh/github-deploy

# Display private key - COPY ALL OF THIS
cat ~/.ssh/github-deploy
```

**Copy from `-----BEGIN OPENSSH PRIVATE KEY-----` to `-----END OPENSSH PRIVATE KEY-----`**

---

### 3. Update SSH_PRIVATE_KEY Secret in GitHub

1. Go to: https://github.com/SahanHasintha/supermarket-web/settings/secrets/actions
2. Click on `SSH_PRIVATE_KEY`
3. Click "Update" 
4. Delete old content
5. Paste the key you copied (entire key with BEGIN/END)
6. Click "Update secret"

---

### 4. Verify Sudo Works Without Password on EC2

**☁️ ON EC2:**

```bash
# Test if sudo works without password
sudo ls /var/www/

# If it asks for password, fix it:
sudo visudo

# Add this line at the END of the file:
ubuntu ALL=(ALL) NOPASSWD: ALL

# Save: Ctrl+X, Y, Enter
```

---

### 5. Test SSH Connection from Local

**💻 ON YOUR MAC:**

```bash
# Test if you can SSH to EC2
ssh -i ~/.ssh/github-deploy ubuntu@15.134.39.65 "echo 'SSH works'"

# Should print: SSH works
```

If this fails, the GitHub Actions will fail too.

---

### 6. Check GitHub Actions Logs

1. Go to: https://github.com/SahanHasintha/supermarket-web/actions
2. Click on the most recent workflow run
3. Click on "deploy" job
4. Expand each step and look for errors

**Common errors to look for:**
- "Permission denied (publickey)" in Setup SSH
- "Connection refused" in Deploy to EC2
- Any red ❌ marks

---

### 7. Verify Deployment Actually Happened

After workflow completes:

**☁️ ON EC2:**

```bash
# Check file timestamps
ls -lh /var/www/supermarket/index.html

# Check if recent (within last 5 minutes)
stat /var/www/supermarket/index.html | grep Modify
```

---

### 8. Clear Browser Cache Completely

Even if deployment works, you might see old files:

**In Browser:**
1. Open Developer Tools (F12)
2. Right-click the refresh button
3. Click "Empty Cache and Hard Reload"
4. Or open in Incognito window

---

## 🎯 Quick Test Commands

### Test 1: SSH Connection Works

**💻 ON MAC:**
```bash
ssh -i ~/.ssh/github-deploy ubuntu@15.134.39.65 "hostname"
```

Should show: `ip-172-31-20-143`

### Test 2: Can Write to Target Dir

**☁️ ON EC2:**
```bash
sudo touch /var/www/supermarket/test.txt
ls -la /var/www/supermarket/test.txt
sudo rm /var/www/supermarket/test.txt
```

Should work without errors.

### Test 3: Manual Deploy Works

**☁️ ON EC2:**
```bash
cd ~/latest-code  # or wherever your git repo is
git pull
npm run build
sudo cp -r dist/* /var/www/supermarket/
sudo chown -R www-data:www-data /var/www/supermarket
sudo systemctl restart nginx
```

Check site - should show changes.

---

## 🚨 If Still Not Working

### Check These:

1. **GitHub Actions failing?** 
   - Check which step fails
   - Read the error message
   - Usually it's SSH setup or Deploy to EC2 step

2. **GitHub Actions succeeding but no changes?**
   - Check file timestamps on EC2
   - Clear browser cache completely
   - Check if files are actually being updated

3. **Files updated but site doesn't change?**
   - It's definitely browser cache
   - Must use incognito OR clear all cache

---

## 📞 Get Help

Send this information:

1. Screenshot of GitHub Actions workflow (showing which steps passed/failed)
2. Output of: `ls -lh /var/www/supermarket/` from EC2
3. Output of: `cat /etc/nginx/sites-available/wynnum-supermarket` from EC2
4. What you see in browser vs what you expect to see

---

## 🎯 Manual Deployment (Always Works)

If CI/CD continues to fail, use manual deployment:

**💻 ON MAC:**
```bash
cd "/Users/sheriwitharanage/Documents/Sahan/Retail shop new"
git add .
git commit -m "Changes"
git push origin main
```

**☁️ ON EC2:**
```bash
cd ~/your-git-folder
git pull origin main
npm run build
sudo cp -r dist/* /var/www/supermarket/
sudo chown -R www-data:www-data /var/www/supermarket
sudo systemctl restart nginx
```

This works 100% of the time!

