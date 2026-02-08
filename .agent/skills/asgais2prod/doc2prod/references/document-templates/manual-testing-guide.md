# Manual Testing Guide Template

**Project:** [Project Name]  
**Version:** 1.0  
**Date:** [Date]  
**Tester:** [Name]

---

## Overview

This guide provides step-by-step instructions for manually testing all features of [Project Name].

**Prerequisites:**
- [ ] Application is running locally or on test server
- [ ] Database is seeded with test data (if applicable)
- [ ] Browser: Chrome/Firefox/Safari (latest version)
- [ ] Test accounts created (if needed)

**Test Environment:**
- **URL:** [http://localhost:3000 or test server URL]
- **API Base:** [http://localhost:3000/api]
- **Database:** [Test database name]

---

## Test Accounts

### Admin Account
- **Email:** admin@test.com
- **Password:** Admin123!

### Regular User Account
- **Email:** user@test.com
- **Password:** User123!

---

## Feature Testing

### 1. User Registration

**Purpose:** Verify users can create new accounts

**Steps:**
1. Navigate to [http://localhost:3000/register]
2. Fill in registration form:
   - Email: `newuser@test.com`
   - Password: `SecurePass123!`
   - Name: `Test User`
3. Click "Register" button
4. Observe response

**Expected Results:**
- ✅ User is created successfully
- ✅ Success message displayed
- ✅ User is redirected to dashboard/home
- ✅ User is automatically logged in

**Edge Cases to Test:**
- [ ] Register with existing email (should fail with error)
- [ ] Register with weak password (should show validation error)
- [ ] Register with invalid email format (should show error)
- [ ] Submit empty form (should show validation errors)

**Status:** [ ] Pass [ ] Fail  
**Notes:** _______________________

---

### 2. User Login

**Purpose:** Verify users can log into their accounts

**Steps:**
1. Navigate to [http://localhost:3000/login]
2. Enter credentials:
   - Email: `user@test.com`
   - Password: `User123!`
3. Click "Login" button
4. Observe response

**Expected Results:**
- ✅ User is logged in successfully
- ✅ Redirected to dashboard
- ✅ User name/email displayed in header
- ✅ Auth token stored (check browser DevTools > Application > Cookies/LocalStorage)

**Edge Cases to Test:**
- [ ] Login with wrong password (should show error)
- [ ] Login with non-existent email (should show error)
- [ ] Login with empty fields (should show validation)

**Status:** [ ] Pass [ ] Fail  
**Notes:** _______________________

---

### 3. Protected Routes

**Purpose:** Verify authentication is enforced

**Steps:**
1. Log out (if logged in)
2. Try to access protected route: [http://localhost:3000/dashboard]
3. Observe behavior

**Expected Results:**
- ✅ Redirected to login page
- ✅ Error message shown (optional)
- ✅ After login, redirected back to intended page

**Test While Logged In:**
1. Log in as regular user
2. Access [http://localhost:3000/dashboard]
3. Should see dashboard content

**Status:** [ ] Pass [ ] Fail  
**Notes:** _______________________

---

### 4. [Core Feature 1 - e.g., Create Post]

**Purpose:** [Describe what this feature does]

**Steps:**
1. Log in as user
2. Navigate to [/posts/new]
3. Fill in form:
   - Title: `Test Post`
   - Content: `This is a test post content`
   - Category: `General`
4. Click "Create Post"
5. Observe response

**Expected Results:**
- ✅ Post created successfully
- ✅ Success message displayed
- ✅ Redirected to post view page
- ✅ Post appears in post list
- ✅ Post data saved in database

**Edge Cases:**
- [ ] Create with empty title (should fail)
- [ ] Create with very long content (should handle)
- [ ] Create without category (should use default or fail)

**Status:** [ ] Pass [ ] Fail  
**Notes:** _______________________

---

### 5. [Core Feature 2 - e.g., Edit Post]

**Purpose:** [Describe what this feature does]

**Steps:**
1. Navigate to existing post
2. Click "Edit" button
3. Modify title to: `Updated Test Post`
4. Click "Save"
5. Observe changes

**Expected Results:**
- ✅ Post updated successfully
- ✅ Changes reflected immediately
- ✅ Success message shown
- ✅ Updated timestamp changed

**Edge Cases:**
- [ ] Edit without permission (different user's post)
- [ ] Edit with invalid data
- [ ] Cancel edit (changes not saved)

**Status:** [ ] Pass [ ] Fail  
**Notes:** _______________________

---

### 6. [Core Feature 3 - e.g., Delete Post]

**Purpose:** [Describe what this feature does]

**Steps:**
1. Navigate to post to delete
2. Click "Delete" button
3. Confirm deletion in modal
4. Observe result

**Expected Results:**
- ✅ Confirmation modal appears
- ✅ Post deleted after confirmation
- ✅ Post removed from list
- ✅ Success message shown
- ✅ Redirected to post list

**Edge Cases:**
- [ ] Cancel deletion (post remains)
- [ ] Delete without permission (should fail)
- [ ] Delete non-existent post (should handle gracefully)

**Status:** [ ] Pass [ ] Fail  
**Notes:** _______________________

---

## API Testing (with curl or Postman)

### Test 1: Register User (API)

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "apitest@test.com",
    "password": "ApiTest123!",
    "name": "API Test User"
  }'
```

**Expected Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "apitest@test.com",
    "name": "API Test User"
  },
  "token": "jwt-token-here"
}
```

**Status:** [ ] Pass [ ] Fail

---

### Test 2: Login (API)

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@test.com",
    "password": "User123!"
  }'
```

**Expected Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@test.com"
  },
  "token": "jwt-token-here"
}
```

**Status:** [ ] Pass [ ] Fail

---

### Test 3: Get Protected Resource (API)

```bash
# Replace YOUR_TOKEN with actual token from login
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected Response:**
```json
{
  "id": "uuid",
  "email": "user@test.com",
  "name": "Test User",
  "role": "user"
}
```

**Status:** [ ] Pass [ ] Fail

---

## Browser Compatibility Testing

Test the application in multiple browsers:

### Chrome (Latest)
- [ ] All features work
- [ ] UI renders correctly
- [ ] No console errors

### Firefox (Latest)
- [ ] All features work
- [ ] UI renders correctly
- [ ] No console errors

### Safari (Latest)
- [ ] All features work
- [ ] UI renders correctly
- [ ] No console errors

### Edge (Latest)
- [ ] All features work
- [ ] UI renders correctly
- [ ] No console errors

---

## Responsive Design Testing

Test on different screen sizes:

### Desktop (1920x1080)
- [ ] Layout looks good
- [ ] All features accessible
- [ ] No horizontal scroll

### Tablet (768x1024)
- [ ] Layout adapts properly
- [ ] Navigation works
- [ ] Touch interactions work

### Mobile (375x667)
- [ ] Mobile menu works
- [ ] Forms are usable
- [ ] Text is readable
- [ ] Buttons are tappable

---

## Performance Testing

### Page Load Times
- [ ] Home page loads in < 2 seconds
- [ ] Dashboard loads in < 3 seconds
- [ ] API responses < 500ms

### Network Throttling
Test with slow 3G:
- [ ] Application remains usable
- [ ] Loading states shown
- [ ] No timeouts

---

## Security Testing

### Authentication
- [ ] Cannot access protected routes without login
- [ ] Token expires after set time
- [ ] Logout clears token/session
- [ ] Cannot reuse old tokens

### Authorization
- [ ] Users can only edit their own data
- [ ] Admin features hidden from regular users
- [ ] API enforces permissions

### Input Validation
- [ ] XSS attempts are sanitized
- [ ] SQL injection attempts fail
- [ ] File upload restrictions work

---

## Error Handling

### Network Errors
1. Disconnect internet
2. Try to submit form
3. **Expected:** Error message shown, retry option available

### Server Errors
1. Stop backend server
2. Try to load page
3. **Expected:** Friendly error message, not technical stack trace

### Validation Errors
1. Submit invalid data
2. **Expected:** Clear error messages, field highlighting

---

## Accessibility Testing

### Keyboard Navigation
- [ ] Can tab through all interactive elements
- [ ] Can submit forms with Enter key
- [ ] Can close modals with Escape key
- [ ] Focus indicators visible

### Screen Reader
- [ ] Images have alt text
- [ ] Form inputs have labels
- [ ] Buttons have descriptive text
- [ ] Error messages are announced

### Color Contrast
- [ ] Text is readable
- [ ] Meets WCAG AA standards
- [ ] Works in high contrast mode

---

## Test Results Summary

**Total Tests:** [Number]  
**Passed:** [Number]  
**Failed:** [Number]  
**Blocked:** [Number]

### Critical Issues Found
1. [Issue description]
2. [Issue description]

### Minor Issues Found
1. [Issue description]
2. [Issue description]

### Recommendations
1. [Recommendation]
2. [Recommendation]

---

## Sign-off

**Tested by:** _______________________  
**Date:** _______________________  
**Status:** [ ] Approved [ ] Needs Fixes  
**Comments:** _______________________

---

## Appendix

### Common Issues & Solutions

**Issue:** Login not working  
**Solution:** Check if backend server is running, verify credentials

**Issue:** 404 errors  
**Solution:** Check API endpoints match documentation

**Issue:** CORS errors  
**Solution:** Verify CORS configuration in backend

---

**Template Version:** 1.0.0  
**Last Updated:** 2026-01-19
