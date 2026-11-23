// 연도 표시
document.getElementById('year').textContent = new Date().getFullYear();

// 다크 모드 토글 (선택 저장)
const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
try {
  const saved = localStorage.getItem('theme');
  if (saved) root.dataset.theme = saved;
} catch (e) {}

toggle.addEventListener('click', () => {
  const isDark = root.dataset.theme
    ? root.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = isDark ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
});

// 스크롤 시 네비게이션 테두리
const nav = document.querySelector('.nav');
addEventListener('scroll', () => nav.classList.toggle('is-scrolled', scrollY > 10), { passive: true });

// 섹션 등장 애니메이션
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// 현재 섹션에 맞춰 메뉴 강조
const links = document.querySelectorAll('.nav__links a');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('section[id]').forEach((s) => navObserver.observe(s));

// 프로젝트 필터
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.card');
filters.forEach((btn) => {
  btn.addEventListener('click', () => {
    filters.forEach((b) => b.classList.toggle('is-active', b === btn));
    const f = btn.dataset.filter;
    cards.forEach((c) => c.classList.toggle('is-hidden', f !== 'all' && c.dataset.category !== f));
  });
});
