"""Validate local asset links and complete vendored official OS ignore templates."""
from pathlib import Path
from html.parser import HTMLParser
root=Path(__file__).resolve().parent.parent
class Assets(HTMLParser):
    def handle_starttag(self,tag,attrs):
        for key,value in attrs:
            if key in ('src','href') and value and not value.startswith(('#','http','data:')):
                assert (root/value).exists(), value
Assets().feed((root/'index.html').read_text())
combined=(root/'.gitignore').read_bytes()
for name in ['Linux','Windows','macOS']:
    data=(root/f'docs/gitignore/{name}.gitignore').read_bytes()
    assert len(data)>100 and data in combined, name
assert '127.0.0.1' in (root/'server.py').read_text()
print('PASS: root assets, all three complete OS ignore templates, loopback server')
