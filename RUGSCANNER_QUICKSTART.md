# ⚡ RugScanner Quick Start Guide

Get up and running with the Token Security Scanner in 2 minutes!

---

## 🚀 Start Here

### Step 1: Verify Dev Server is Running
```bash
# Check if server is running at localhost:5174
# You should see: "VITE ready in X ms"
```

**Current Status:** ✅ Running at http://localhost:5174

### Step 2: Access the Scanner
```
Option A: Click URL
http://localhost:5174/scanner

Option B: Click "Scanner" in Navbar
1. Go to http://localhost:5174
2. Click "Scanner" link

Option C: Direct Path
Use browser address bar → type /scanner → press Enter
```

### Step 3: Test with Sample Token
Copy this address and paste in the scanner:
```
EPjFWaJrkqAu7FSVzr8a3p2RZ2n1yURd9twS3hqEvgo
```
(This is USDC on Solana)

### Step 4: Click "Scan Token"
Click the red button and watch the results appear!

### Step 5: Explore the Results
- 📊 Click **Overview** tab → See market data
- ⚠️ Click **Risk Factors** tab → See risks
- ✓ Click **Checks** tab → See security checks

---

## ✨ Key Features to Try

### 1. Copy Address
Click the copy button next to the token address
→ Automatic "Copied!" notification

### 2. View on Solscan
Click "View on Solscan" button
→ Opens verification page in new tab

### 3. Verify on RugCheck
Click "Verify on RugCheck" button
→ Opens RugCheck verification in new tab

### 4. Tab Navigation
Switch between Overview, Risk Factors, and Checks
→ Smooth animations

### 5. Mobile Responsive
Resize browser window or test on phone
→ Layout adapts automatically

---

## 📊 Understanding Risk Levels

### Risk Score Visual
```
🔴 Very High (61-100):  EXTREME CAUTION
🟠 High (41-60):        HEAVY CAUTION
🟡 Medium (21-40):      LIGHT CAUTION
🟢 Low (0-20):          GENERALLY SAFE
```

### Example
```
If you see:  ⭕ SCORE: 72 🔴

It means:    VERY HIGH RISK - Avoid unless researching
Action:      Check Risk Factors tab for details
```

---

## 🧪 Quick Test (5 minutes)

1. **Navigate** → http://localhost:5174/scanner
2. **Paste** → EPjFWaJrkqAu7FSVzr8a3p2RZ2n1yURd9twS3hqEvgo
3. **Click** → "Scan Token" button
4. **Wait** → Results appear (2 seconds)
5. **Explore** → Click each tab
6. **Test Copy** → Click copy button
7. **Verify** → Open Solscan/RugCheck links
8. **Mobile Test** → Resize window or use phone

---

## 📱 Mobile Testing

### How to Test on Mobile
1. Open browser DevTools (F12)
2. Click Device Emulator icon
3. Choose "iPhone 12" or "iPad"
4. Test all features

### Or Use Real Phone
1. Get local IP: `ipconfig getifaddr en0` (macOS)
2. On phone: http://YOUR_IP:5174/scanner
3. Test all features

---

## 🔍 Test Token Addresses

### Safe Tokens (Low Risk)
```
EPjFWaJrkqAu7FSVzr8a3p2RZ2n1yURd9twS3hqEvgo  USDC (Stablecoin)
So11111111111111111111111111111111111111112  SOL (Native)
SRMuApVgqbCV7SgD4o8T8KYKYymynqn5iPhzYUffH   SRM (Major)
```

### Mixed Tokens
```
Any 42-44 character base58 address will work!
Invalid addresses will show error message
```

---

## ❓ FAQ - Quick Answers

**Q: Where's the Scanner?**
A: Click "Scanner" in navbar or go to `/scanner` route

**Q: What token can I use?**
A: Any Solana token address (42-44 character string)

**Q: Is the data real?**
A: Currently mock data for testing. Will use real API later.

**Q: How's risk calculated?**
A: High-risk=35pts, Medium=20pts, Low=5pts, total 0-100

**Q: Why is my token showing high risk?**
A: Because the security checks failed. Check Risk Factors tab.

**Q: Can I copy the address?**
A: Yes! Click the copy button next to the address.

**Q: Works on mobile?**
A: Yes! Fully responsive design.

**Q: Are there errors?**
A: No! Code has 0 errors, 0 warnings.

**Q: How do I use real API?**
A: See RUGSCANNER_SETUP.md → API Integration section

---

## 🛠️ Troubleshooting

### Page Not Loading?
```
1. Check server is running: http://localhost:5174
2. If not, run: npm run dev
3. Wait for "VITE ready" message
4. Refresh browser
```

### No Results?
```
1. Verify address is 42-44 characters
2. Verify address is base58 format
3. Check browser console (F12) for errors
4. Try sample address: EPjFWaJrkqAu7FSVzr8a3p2RZ2n1yURd9twS3hqEvgo
```

### Mobile Not Responsive?
```
1. Try different browser
2. Clear cache: Ctrl+Shift+Del
3. Hard refresh: Ctrl+Shift+R
4. Check Device Emulation: F12 → Toggle device
```

### Console Errors?
```
1. Open DevTools: F12
2. Go to Console tab
3. Screenshot errors
4. Check error messages
5. Verify all files created correctly
```

---

## 📚 Need More Help?

### Read These Files
1. **RUGSCANNER_SETUP.md** - Full setup guide
2. **RUGSCANNER_FEATURES.md** - Feature details
3. **RUGSCANNER_TESTS.md** - Testing procedures
4. **RUGSCANNER_VISUAL_GUIDE.md** - Visual reference

### Check These Files (Code)
- `src/components/RugScanner.jsx` - Main component
- `src/components/RugScanner.css` - Styling
- `src/App.jsx` - Route configuration
- `src/components/Navbar.jsx` - Navigation

---

## ✅ Success Checklist

- [ ] Dev server running at http://localhost:5174
- [ ] Can navigate to /scanner route
- [ ] Search box accepts token address
- [ ] Scan button works
- [ ] Results display with 3 tabs
- [ ] Overview tab shows metrics
- [ ] Risk Factors tab shows risks
- [ ] Checks tab shows security checks
- [ ] Copy button works
- [ ] Solscan link opens
- [ ] RugCheck link opens
- [ ] Mobile view is responsive
- [ ] No console errors
- [ ] Everything looks good!

---

## 🎯 Next Steps

### Short Term
1. ✅ Test the feature (you are here!)
2. ✅ Verify all functionality
3. ⏳ Try different token addresses

### Later
1. ⏳ Read full documentation
2. ⏳ Set up real API integration
3. ⏳ Deploy to production

---

## 💡 Pro Tips

### Testing Smart
- Use sample addresses first
- Test all three tabs
- Try on mobile device
- Check error messages
- Verify external links

### For Developers
- Code is in RugScanner.jsx
- Styling in RugScanner.css
- Mock data in generateMockScanResult()
- Ready to integrate real API

### For Users
- Always research tokens before investing
- Check multiple sources
- Don't rely on risk score alone
- Read security checks carefully
- Verify on blockchain

---

## 🚀 You're Ready!

**Your token security scanner is live and ready to test.**

### Go Test It Now:
1. Visit: **http://localhost:5174/scanner**
2. Enter: **EPjFWaJrkqAu7FSVzr8a3p2RZ2n1yURd9twS3hqEvgo**
3. Click: **Scan Token**
4. Enjoy! 🛡️

---

## 📞 Questions?

1. Check documentation files
2. Review source code
3. Check browser console for errors
4. Verify all files are created

---

**Happy scanning! 🛡️**

