import re
import unittest
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / ".book-docs"
SITE = ROOT / "site"


class WebBookTests(unittest.TestCase):
    def test_documentation_tree_contains_every_nav_target(self):
        nav_text = (ROOT / "mkdocs.yml").read_text(encoding="utf-8")
        targets = re.findall(r":\s+([A-Za-z0-9_./-]+\.(?:md|html))\s*$", nav_text, re.MULTILINE)
        missing = [target for target in targets if not (DOCS / target).exists()]
        self.assertFalse(missing, f"Missing documentation targets: {missing}")

    def test_markdown_internal_links_resolve(self):
        failures = []
        for source in DOCS.rglob("*.md"):
            text = source.read_text(encoding="utf-8")
            for match in re.finditer(r"!?\[[^\]]*\]\(([^)]+)\)", text):
                target = match.group(1).strip().split()[0].strip("<>")
                if not target or target.startswith(("#", "http://", "https://", "mailto:", "data:")):
                    continue
                path = target.split("#", 1)[0].split("?", 1)[0]
                resolved = (source.parent / path).resolve()
                if not resolved.exists():
                    failures.append(f"{source.relative_to(DOCS)} -> {target}")
        self.assertFalse(failures, "Broken Markdown links:\n" + "\n".join(failures))

    def test_built_site_internal_links_resolve(self):
        self.assertTrue(SITE.exists(), "Run mkdocs build before the built-site link test")
        failures = []
        for html in SITE.rglob("*.html"):
            text = html.read_text(encoding="utf-8", errors="ignore")
            for match in re.finditer(r"(?:href|src)=[\"']([^\"']+)[\"']", text):
                target = match.group(1)
                parsed = urlparse(target)
                if parsed.scheme or parsed.netloc or target.startswith(("#", "data:", "javascript:")):
                    continue
                path = parsed.path.lstrip("/")
                if not path:
                    continue
                candidates = [SITE / path]
                if path.endswith("/"):
                    candidates.append(SITE / path / "index.html")
                if not Path(path).suffix:
                    candidates.append(SITE / (path + ".html"))
                    candidates.append(SITE / path / "index.html")
                if not any(candidate.exists() for candidate in candidates):
                    failures.append(f"{html.relative_to(SITE)} -> {target}")
        self.assertFalse(failures, "Broken built-site links:\n" + "\n".join(failures[:100]))


if __name__ == "__main__":
    unittest.main()
