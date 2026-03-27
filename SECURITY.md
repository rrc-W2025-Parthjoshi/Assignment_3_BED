# Security Configuration

## Helmet.js Configuration

### Configuration Applied
```typescript
helmet({
    contentSecurityPolicy: false,
    hidePoweredBy: true,
    noSniff: true,
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
    },
    frameguard: { action: "deny" },
    referrerPolicy: { policy: "no-referrer" },
});
```

### Justification

1. **contentSecurityPolicy: false** - I turned this off because my API only sends back JSON, not HTML pages. CSP is really meant for websites that render HTML in the browser, so it doesn't really apply here.

2. **hidePoweredBy: true** - This removes the X-Powered-By header from responses. Without this, Express basically tells everyone what framework you're using, which makes it easier for attackers to look up known vulnerabilities.

3. **noSniff: true** - Stops browsers from trying to guess the content type of a response. If a browser misidentifies a file type, it can open up some nasty security holes.

4. **hsts** - Forces clients to use HTTPS instead of HTTP. The maxAge of 31536000 seconds means browsers will remember this for a full year, which helps protect against man-in-the-middle attacks.

5. **frameguard: deny** - Prevents my API responses from being loaded inside an iframe on another site. This blocks clickjacking attacks where someone tricks a user into clicking something they didn't mean to.

6. **referrerPolicy: no-referrer** - Makes sure the Referer header isn't sent with requests. This way sensitive URL info doesn't leak out when someone calls the API.

### Sources

1. Helmet.js Official Documentation - https://helmetjs.github.io/
2. OWASP Secure Headers Project - https://owasp.org/www-project-secure-headers/

---

## CORS Configuration

### Configuration Applied
```typescript
cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
});
```

### Justification

1. **origin** - Instead of allowing every domain to hit my API, I restricted it to only the domains listed in my environment variables. This way random websites can't just make requests to my API.

2. **credentials: true** - Needed this so that auth headers and cookies can actually be sent along with cross-origin requests. Without it, authenticated requests would fail.

3. **methods** - I only allow the HTTP methods my API actually uses. There's no reason to leave other methods open if I'm not using them.

4. **allowedHeaders** - Only Content-Type and Authorization are allowed in request headers. Keeping this tight means less surface area for anything unexpected to sneak through.

### Sources

1. MDN Web Docs: Cross-Origin Resource Sharing - https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
2. OWASP CORS Security Cheat Sheet - https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html