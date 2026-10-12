/* All interactions are local and illustrative. No API calls or tracking. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const copy = {
    zh: {
      allow: '允许执行', review: '需要人工确认', block: '阻止执行',
      allowText: '身份已核验，授权有效，票价在预算范围内。',
      blockText: '缺少已核验身份或有效授权，示例规则阻止本次购票。',
      reviewText: '票价超过当前预算。需要获得新的授权，才能继续。',
      verified: '已核验', unverified: '未核验', valid: '有效', revoked: '无效 / 已撤销',
      title: 'FG-TIDA · 人类与 AI 代理的信任与身份',
      description: '认识 FG-TIDA：面向人类与 Agentic AI 的信任与身份。探索身份、授权与可核查的行动，参与开放协作。'
    },
    en: {
      allow: 'Allow action', review: 'Human approval needed', block: 'Block action',
      allowText: 'Identity is verified, authority is valid, and the fare is within budget.',
      blockText: 'Verified identity or valid authority is missing. The demo rules block this booking.',
      reviewText: 'The fare exceeds the budget. New authority is needed before proceeding.',
      verified: 'Verified', unverified: 'Unverified', valid: 'Valid', revoked: 'Invalid / revoked',
      title: 'FG-TIDA · Trust and Identity for Humans and Agentic AI',
      description: 'Explore FG-TIDA: trust and identity for humans and agentic AI. Understand identity, authority and inspectable action, and join open collaboration.'
    }
  };
  let language = 'zh';
  const money = value => '¥' + Number(value).toLocaleString('en-US');
  const price = 2600;
  function updateDecision() {
    const identity = $('identity').checked;
    const authority = $('authority').checked;
    const budget = Number($('budget').value);
    const state = !identity || !authority ? 'block' : budget < price ? 'review' : 'allow';
    const words = copy[language];
    $('budget-output').textContent = money(budget);
    $('decision').className = 'decision ' + state;
    $('decision-icon').textContent = {allow: '✓', review: '!', block: '×'}[state];
    $('decision-title').textContent = words[state];
    $('decision-description').textContent = words[state + 'Text'];
    $('evidence-identity').textContent = identity ? words.verified : words.unverified;
    $('evidence-authority').textContent = authority ? words.valid : words.revoked;
    $('evidence-budget').textContent = `${money(price)} ${price <= budget ? '≤' : '>'} ${money(budget)}`;
  }
  function setLanguage(next) {
    language = next === 'en' ? 'en' : 'zh';
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-zh][data-en]').forEach(node => {
      node.textContent = node.getAttribute('data-' + language);
    });
    document.querySelectorAll('[data-aria-zh][data-aria-en]').forEach(node => {
      node.setAttribute('aria-label', node.getAttribute('data-aria-' + language));
    });
    const toggle = $('language-toggle');
    toggle.textContent = language === 'zh' ? 'EN ↗' : '中文 ↗';
    toggle.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换到中文');
    document.title = copy[language].title;
    document.querySelector('meta[name="description"]').content = copy[language].description;
    updateDecision();
    try { localStorage.setItem('fg-tida-language', language); } catch (_) { /* storage optional */ }
  }
  $('language-toggle').addEventListener('click', () => setLanguage(language === 'zh' ? 'en' : 'zh'));
  const nav = $('site-nav');
  const menu = $('menu-toggle');
  function closeMenu() { nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); }
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menu.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); menu.focus(); }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  const desktop = window.matchMedia('(min-width: 851px)');
  if (desktop.addEventListener) desktop.addEventListener('change', event => { if (event.matches) closeMenu(); });
  document.querySelectorAll('[data-preset]').forEach(button => {
    button.addEventListener('click', () => {
      const preset = button.dataset.preset;
      $('identity').checked = true;
      $('authority').checked = preset !== 'revoked';
      $('budget').value = preset === 'over' ? 2000 : 3000;
      document.querySelectorAll('[data-preset]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      updateDecision();
    });
  });
  ['identity', 'authority', 'budget'].forEach(id => {
    $(id).addEventListener('input', () => {
      document.querySelectorAll('[data-preset]').forEach(button => button.setAttribute('aria-pressed', 'false'));
      updateDecision();
    });
  });
  let stored = 'zh';
  try { stored = localStorage.getItem('fg-tida-language') || 'zh'; } catch (_) { /* file:// and privacy modes supported */ }
  setLanguage(stored);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduced) {
    const targets = document.querySelectorAll('.section-heading, .why-grid, .explore-layout, .lab-panel, .resource-row, .join-grid, .faq-grid');
    document.documentElement.classList.add('reveal-enabled');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, {threshold: 0.06});
    targets.forEach(node => { node.classList.add('reveal'); observer.observe(node); });
  }
})();
