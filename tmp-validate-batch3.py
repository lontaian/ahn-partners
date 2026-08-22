# batch3 검증 (수주나비 루프 C834)
import json, io, re, glob

ref = json.load(io.open("_input-batch2-hindsight-bias.json", encoding="utf-8"))
ref_keys = set(ref.keys())
banned = re.compile("[—–·…→←↑↓⇒" + "\U0001F300-\U0001FAFF☀-➿]")
ok = 0
files = sorted(glob.glob("_input-batch3-*.json"))
for f in files:
    d = json.load(io.open(f, encoding="utf-8"))
    miss = ref_keys - set(d.keys())
    extra = set(d.keys()) - ref_keys
    bad = banned.findall(json.dumps(d, ensure_ascii=False))
    good = not miss and not extra and not bad
    print(f, "OK" if good else f"문제 miss={sorted(miss)} extra={sorted(extra)} banned={len(bad)}", "|", d.get("title", "")[:34])
    if good:
        ok += 1
print("합격", ok, "/", len(files))
