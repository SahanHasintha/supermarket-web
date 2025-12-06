# 🚀 Complete CI/CD Deployment Guide

## 📋 What I Created For You

I've created a complete troubleshooting and testing system:

1. **`CI-CD-DEBUG.md`** - Complete troubleshooting guide
2. **`test-deployment.sh`** - Automated test script to verify everything
3. **`.github/workflows/simple-deploy.yml`** - New, more reliable deployment workflow
4. **`.github/workflows/deploy.yml`** - Your existing workflow (still there)

---

## 🎯 Quick Start - Follow These Steps

### Step 1: Run the Test Script

This will check if everything is configured correctly:

```bash
cd "/Users/sheriwitharanage/Documents/Sahan/Retail shop new"
./test-deployment.sh
```

**What it checks:**
- ✅ SSH key exists and has correct format
- ✅ Can connect to EC2 via SSH
- ✅ Target directory is accessible
- ✅ Sudo works without password
- ✅ Nginx is running
- ✅ Website is accessible
- ✅ Git repository is configured
- ✅ Build process works

---

### Step 2: Fix Any Failed Tests

If the test script shows failures, it will tell you exactly how to fix them.

**Most common issues:**

#### ❌ SSH Key Not Found
```bash
# On EC2, generate new key:
ssh ubuntu@15.134.39.65
ssh-keygen -t ed25519 -C "github-deploy" -f ~/.ssh/github-deploy -N ""
cat ~/.ssh/github-deploy.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/github-deploy
cat ~/.ssh/github-deploy  # Copy this entire output

# Copy the key from -----BEGIN to -----END (inclusive)
```

Then update GitHub secret:
1. Go to: https://github.com/SahanHasintha/supermarket-web/settings/secrets/actions
2. Click `SSH_PRIVATE_KEY` → Update
3. Paste the entire key
4. Save

#### ❌ Sudo Requires Password
```bash
# On EC2:
sudo visudo
# Add this line at the END:
ubuntu ALL=(ALL) NOPASSWD: ALL
# Save: Ctrl+X, Y, Enter
```

---

### Step 3: Choose Your Workflow

You have two workflows to choose from:

#### Option A: Use the New Simple Workflow (Recommended)

```bash
# Disable the old workflow
mv .github/workflows/deploy.yml .github/workflows/deploy.yml.backup

# The new simple-deploy.yml will now be used
```

#### Option B: Keep the Existing Workflow

```bash
# Remove the new one
rm .github/workflows/simple-deploy.yml

# Keep using deploy.yml
```

**Recommendation:** Use the new `simple-deploy.yml` - it has:
- Better error messages
- More verbose logging
- Easier to debug
- Tests SSH connection before deploying

---

### Step 4: Deploy!

```bash
# Make a small test change
echo "// Test deployment $(date)" >> src/App.tsx

# Commit and push
git add .
git commit -m "Test CI/CD deployment"
git push origin main
```

---

### Step 5: Monitor the Deployment

1. Open: https://github.com/SahanHasintha/supermarket-web/actions
2. Watch the workflow run in real-time
3. Each step shows detailed output
4. Look for the green ✅ checkmarks

---

### Step 6: Verify the Changes

**After deployment completes:**

1. **Clear your browser cache completely**
   - Chrome/Edge: `Ctrl+Shift+Delete` → Clear all
   - Or use Incognito window

2. **Visit your website:**
   - http://15.134.39.65

3. **Check on EC2:**
   ```bash
   ssh ubuntu@15.134.39.65
   ls -lh /var/www/supermarket/
   # Check the file timestamps - should be recent
   ```

---

## 🔧 Troubleshooting

### The workflow is GREEN ✅ but changes don't appear

**Cause:** Browser cache

**Solution:**
```
1. Open browser Developer Tools (F12)
2. Right-click the refresh button
3. Click "Empty Cache and Hard Reload"
4. Or open in Incognito/Private window
```

### Workflow fails at "Setup SSH" step

**Cause:** SSH key format is wrong

**Solution:**
1. Generate new key on EC2 (see Step 2 above)
2. Copy the ENTIRE key including BEGIN/END lines
3. Update GitHub secret with exact key
4. No extra spaces or newlines

### Workflow fails at "Test SSH Connection"

**Cause:** 
- Public key not in EC2 authorized_keys
- Security group doesn't allow SSH from GitHub IPs

**Solution:**
```bash
# On EC2, ensure public key is added:
cat ~/.ssh/github-deploy.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh

# Check SSH service is running:
sudo systemctl status ssh
```

### Workflow fails at "Deploy on EC2" step

**Cause:** Permission issues or sudo requires password

**Solution:**
```bash
# On EC2:
sudo visudo
# Add at END: ubuntu ALL=(ALL) NOPASSWD: ALL

# Also ensure target directory ownership:
sudo chown -R www-data:www-data /var/www/supermarket
sudo chmod -R 755 /var/www/supermarket
```

---

## 📊 Understanding the Workflow

### What Happens During Deployment:

1. **Checkout code** - Gets latest code from GitHub
2. **Setup Node.js** - Installs Node.js 20
3. **Install dependencies** - Runs `npm ci`
4. **Build application** - Runs `npm run build`
5. **Setup SSH** - Configures SSH key to connect to EC2
6. **Test SSH** - Verifies connection works
7. **Create package** - Makes `deployment.tar.gz` from `dist/` folder
8. **Upload to EC2** - SCPs the package to EC2's `/tmp/`
9. **Deploy on EC2** - Extracts files to `/var/www/supermarket/`
10. **Restart Nginx** - Restarts web server
11. **Verify** - Checks website is accessible

### If any step fails:
- ❌ Red X appears
- Click on the step to see detailed error
- Fix the issue based on error message
- Push again to retry

---

## 🎯 Manual Deployment (Backup Method)

If CI/CD continues to have issues, use manual deployment:

### On EC2:

```bash
# Clone repo if not already done
cd ~
git clone https://github.com/SahanHasintha/supermarket-web.git
cd supermarket-web

# For subsequent deployments:
cd ~/supermarket-web
git pull origin main
npm install
npm run build
sudo cp -r dist/* /var/www/supermarket/
sudo chown -R www-data:www-data /var/www/supermarket/
sudo systemctl restart nginx

echo "✅ Deployed successfully!"
```

This method always works and takes about 2 minutes.

---

## 📞 Need More Help?

1. **Run the test script:** `./test-deployment.sh`
2. **Read the debug guide:** `CI-CD-DEBUG.md`
3. **Check workflow logs:** https://github.com/SahanHasintha/supermarket-web/actions
4. **Verify on EC2:**
   ```bash
   ssh ubuntu@15.134.39.65
   ls -lh /var/www/supermarket/
   sudo systemctl status nginx
   sudo tail -f /var/log/nginx/error.log
   ```

---

## 🎉 Success Checklist

When everything works, you should see:

- ✅ Test script passes all tests
- ✅ GitHub Actions workflow shows all green checkmarks
- ✅ Workflow completes in 2-3 minutes
- ✅ Website shows your changes (after cache clear)
- ✅ EC2 files have recent timestamps
- ✅ Nginx is running without errors

**Then you have a fully functional CI/CD pipeline!** 🎊

Every time you push to `main` branch, your site will automatically update within 2-3 minutes.

---

## 🚀 Next Steps

Once deployment is working:

1. **Add environment variables** for different environments
2. **Set up staging environment** for testing
3. **Add automated tests** before deployment
4. **Configure custom domain** instead of IP address
5. **Add HTTPS** with Let's Encrypt SSL certificate
6. **Set up monitoring** for uptime and errors

But for now, let's get the basic deployment working first! 😊

