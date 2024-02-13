# comandos

```bash
npm create vite@latest
# vanilla
# javascript
# name: tetris
cd tetris
pnpm install
pnpm install standard -D
```

## configuración package.json

```diff
-  "devDependencies": {
-    "standard": "^17.1.0",
-    "vite": "^5.0.0"
-  }
+
+  "devDependencies": {
+    "standard": "^17.1.0",
+    "vite": "^5.0.0"
+  },
+  "eslintConfig": {
+    "extends": [
+      "standard"
+    ]
+  }
```