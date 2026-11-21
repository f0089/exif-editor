"""Neue Versionsnummer setzen (index.html + version.txt), damit geöffnete Apps sofort aktualisieren."""
import re, time, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
bid = time.strftime('%Y%m%d%H%M%S')
p = root / 'index.html'; s = p.read_text(encoding='utf-8')
s, n = re.subn(r'(<meta name="build" content=")\d+(">)', r'\g<1>' + bid + r'\g<2>', s); assert n == 1
p.write_text(s, encoding='utf-8'); (root / 'version.txt').write_text(bid + '\n'); print(bid)
