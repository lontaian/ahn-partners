# 스레드/링크드인 발행 토픽 대 기존 insights 커버리지 갭 분석
# (수주나비 루프 C826, 창업자 지시: 발행 토픽으로 insights 200개 보강)
import json, io, glob, os, re
from collections import OrderedDict

HISTORY = "C:/Dev/client/personal/brand-engine/content/history.jsonl"

topics = OrderedDict()
for line in io.open(HISTORY, encoding="utf-8"):
    try:
        d = json.loads(line)
    except Exception:
        continue
    ch = d.get("channel") or ""
    if ch not in ("threads", "linkedin", "threads+linkedin"):
        continue
    t = d.get("title") or d.get("topic") or ""
    if not t or len(t) > 80:
        continue
    topics.setdefault(t, 0)
    topics[t] += 1

existing = set()
for f in glob.glob("insights/*.html"):
    existing.add(os.path.splitext(os.path.basename(f))[0])

def norm(s):
    return re.sub(r"[^a-z0-9]", "", s.lower())

existing_norm = {norm(e) for e in existing}
covered, uncovered = [], []
for t in topics:
    if norm(t) in existing_norm or any(norm(t) in e or e in norm(t) for e in existing_norm if len(e) > 8):
        covered.append(t)
    else:
        uncovered.append(t)

print(f"발행 고유 토픽: {len(topics)}, 기존 insights: {len(existing)}")
print(f"이미 커버: {len(covered)}, 미커버: {len(uncovered)}")

out = ["# 미커버 토픽 목록 (2026-08-22 갭 분석)", "",
       f"- 발행 고유 토픽 {len(topics)}개 중 미커버 {len(uncovered)}개",
       f"- 기존 insights {len(existing)}편, 목표 200편(신규 {200 - len(existing)}편 필요)",
       "- 아래 토픽을 _input JSON 10개 묶음으로 원고화한다(고유 lens 강제).", ""]
for t in uncovered:
    out.append(f"- {t}")
io.open("TOPIC-GAP-2026-08-22.md", "w", encoding="utf-8").write("\n".join(out) + "\n")
print("saved TOPIC-GAP-2026-08-22.md")
