# ahn-partners

An Partners 회사 사이트 — https://ahn-partners.netlify.app

## 배포
- `master` push → Netlify 자동 재배포

## ⚠️ 자동 sync 영역 (수동 수정 금지)

`demos/hrs-dashboard.html`, `demos/pogok.html` 두 파일은 **외부 레포에서 자동 sync**됩니다:

- **Source**: [lontaian/hrs-dash](https://github.com/lontaian/hrs-dash) `public` 브랜치
- **Mechanism**: hrs-dash 레포의 `sync-portfolio.yml` 워크플로우가 이 레포에 auto-commit & push
- **수정 방법**: hrs-dash public 브랜치에서 수정 → push → 자동 반영 (~2분)
- 이 레포에서 직접 수정하면 **다음 sync 때 덮어씌워짐**

Commit 식별 방법: 메시지가 `sync: update hrs-dashboard & pogok from hrs-dash@<hash>` 형식이면 자동 sync 커밋.

세부 내역: [hrs-dash DEPLOY.md](https://github.com/lontaian/hrs-dash/blob/master/DEPLOY.md)

## 로컬 수동 sync (긴급 시)

```bash
npm run sync:hrs   # ../hydrogen/hrs-dash 에 hrs-dash가 클론된 상태에서
```

실행 후 `demos/hrs-dashboard.html`, `demos/pogok.html` 이 갱신되고 `auth-gate.js` leak 검사를 통과하면 OK.
