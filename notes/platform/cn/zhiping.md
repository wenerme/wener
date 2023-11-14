---
title: Boss
---

# Boss

## 提取在线简历

```js
const $$ = document.querySelectorAll.bind(document);
const buildHistory = ($item) => {
  const text = (name) => $item.querySelector(name)?.innerText;
  return `
时间: ${text('.period') || '未填写'}
公司: ${text('.helper-company .helper-text') || '未填写'}
职位: ${text('.name > span:nth-child(3)') || '未填写'}
部门: ${text('.name > span:nth-child(4)') || '未填写'}
工作内容:

${text('.item-text .text')}
`;
};

const buildProjectHistory = ($item) => {
  const text = (name) => $item.querySelector(name)?.innerText;
  return `
时间: ${text('.period')}
项目职位: ${text('.name')}
工作内容:

${text('.item-text .project-content')}
`;
};

const buildResume = () => {
  const $body = $$('.boss-dialog__body')[0];
  if (!$body) {
    alert('未找到简历对话框');
    return;
  }
  const text = (name, $r = $body) => $r.querySelector(name)?.innerText;
  const $ = (name, $r = $body) => Array.from($r.querySelectorAll(name));
  let $projectHistoryItems = $('.resume-item')
    .find((v) => v.querySelector('.title')?.innerText === '项目经验')
    ?.querySelectorAll('.history-item');
  $projectHistoryItems = $projectHistoryItems ? Array.from($projectHistoryItems) : [];
  return `应聘者信息:

姓名: ${text('.geek-name')}
年龄: ${text('.info-labels>span:nth-child(1)')}
工作年限: ${text('.info-labels>.label-text:nth-child(3)')}
学历: ${text('.info-labels>.label-text:nth-child(5)')}
当前状态: ${text('.info-labels>.label-text:nth-child(7)')}
技能关键词: ${$(
    '.keywords',
    $('.resume-item').find((v) => v.querySelector('.title')?.innerText === '关键词'),
  )
    .map((v) => v.innerText.trim())
    .join(',')}

简介:
${text('.selfDescription')}

简历摘要:
${text('.geek-digest-wrap .content') || '无'}

期望职位: ${$('.join-text-wrap .join-text')
    .map((v) => v.innerText)
    .join(', ')}

岗位经验:
- ${$('.join-text-wrap .join-text')
    .map((v) => v.innerText)
    .join('\n- ')}

## 工作经历
${Array.from(
  $('.resume-item')
    .find((v) => v.querySelector('.title')?.innerText === '工作经历')
    .querySelectorAll('.history-item'),
)
  .map((v, i) => {
    return `
### 工作经历 #${i}

${buildHistory(v)}`;
  })
  .join('\n\n')}


## 项目经验
${
  $projectHistoryItems
    .map((v, i) => {
      return `
### 项目经验 #${i}

${buildProjectHistory(v)}`;
    })
    .join('\n\n') || '未填写'
}
`;
};

function buildPrompt(info) {
  return `
我正在招聘一名产品经理兼项目经理，专注于CRM、ERP、SaaS领域。该岗位要求应聘者具备独立负责产品设计和管理的经验，对财税领域有一定了解，并熟练使用Figma等设计工具。现在有一位应聘者，以下是他的背景信息：

'''
${info}
'''

请根据以下标准进行量化评估：

- 匹配度（总分50分）：
  - 技术技能（20分）
  - 相关行业经验（20分）
  - 对财税领域的了解（10分）

- 经验（总分30分）：
  - 工作年限（10分）
  - 项目管理经验（20分）

- 简历信息质量（总分20分）：
  - 简历清晰度和组织性（20分）
  - 经历和技能描述的详实度（10分）

基于这些信息和评分标准，对该应聘者的匹配度、经验和简历信息质量进行量化评价。并对经历信息作出总结，给出评价，最终给出一个是否符合的结论。
`;
}

$$('#copy-resume').forEach((v) => v.remove());

window.__handleCopuResume = () => {
  const out = buildPrompt(buildResume());
  console.log(out);
  navigator.clipboard.writeText(out);
};

function addButton() {
  if ($$('#copy-resume').length) {
    return;
  }
  const btn = document.createElement('button');
  btn.id = 'copy-resume';
  btn.innerText = '复制';
  btn.onclick = () => {
    window.__handleCopuResume();
  };
  $$('.attachment-resume-top-content')[0].append(btn);
}

if (typeof observer !== 'undefined') {
  observer.disconnect();
}
const observer = new MutationObserver((mutationList, observer) => {
  console.log(`observer`, mutationList);
  setTimeout(() => {
    addButton();
  }, 1000);
});
observer.observe(document.body, { attributes: false, childList: true, subtree: false });

// console.log(buildResume());
// copy(buildPrompt(buildResume()));
```
