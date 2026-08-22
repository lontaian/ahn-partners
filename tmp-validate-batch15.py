# batch15 검증: 스키마 + 금지 문자 + topic 표준 8분류 (C890 신설)
import json, io, re, glob

ref = json.load(io.open("_input-batch14-question-design-as-skill.json", encoding="utf-8"))
ref_keys = set(ref.keys())
banned = re.compile("[—–·…→←↑↓⇒" + "\U0001F300-\U0001FAFF☀-➿]")
TABS = {"AI 전략", "AX 교육", "업무 분석", "데이터 의사결정", "운영 시스템", "조직과 사람", "신사업 실행", "테이블 노트"}
ok = 0
files = sorted(glob.glob("_input-batch15-*.json"))
for f in files:
    d = json.load(io.open(f, encoding="utf-8"))
    miss = ref_keys - set(d.keys())
    extra = set(d.keys()) - ref_keys
    bad = banned.findall(json.dumps(d, ensure_ascii=False))
    topic_ok = d.get("topic") in TABS
    good = not miss and not extra and not bad and topic_ok
    msg = "OK" if good else f"문제 miss={sorted(miss)} extra={sorted(extra)} banned={len(bad)} topic={d.get('topic')!r}"
    print(f, msg, "|", d.get("title", "")[:34])
    if good:
        ok += 1
print("합격", ok, "/", len(files))
