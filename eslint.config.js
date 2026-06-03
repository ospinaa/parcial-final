:root {
	--bg: #f5efe6;
	--surface: rgba(255, 251, 245, 0.82);
	--surface-strong: #fffaf3;
	--text: #2c241d;
	--muted: #6d6258;
	--border: rgba(76, 58, 44, 0.14);
	--accent: #bc5b30;
	--accent-strong: #8a3917;
	--shadow: 0 22px 60px rgba(84, 52, 30, 0.14);
	font-family: Inter, 'Segoe UI', sans-serif;
	line-height: 1.5;
	font-weight: 400;
	color: var(--text);
	background:
		radial-gradient(circle at top, rgba(255, 255, 255, 0.7), transparent 36%),
		linear-gradient(180deg, #f9f3eb 0%, #f2e5d3 100%);
	font-synthesis: none;
	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

* {
	box-sizing: border-box;
}

html,
body,
#root {
	min-height: 100vh;
}

body {
	margin: 0;
}

button,
input,
textarea,
select {
	font: inherit;
}

code,
pre {
	font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
}
