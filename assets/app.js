(function () {
  function daysUntil(dateString) {
    var target = new Date(dateString + 'T00:00:00+08:00');
    var now = new Date();
    return Math.ceil((target.getTime() - now.getTime()) / 86400000);
  }

  document.querySelectorAll('[data-days-to]').forEach(function (node) {
    var days = daysUntil(node.getAttribute('data-days-to'));
    if (days > 0) node.textContent = days + ' 天';
    else if (days === 0) node.textContent = '今天';
    else node.textContent = '已结束';
  });

  var currentDate = document.querySelector('[data-current-date]');
  if (currentDate) {
    currentDate.textContent = new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date());
  }

  function readState(key) {
    try { return window.localStorage.getItem(key) === '1'; }
    catch (error) { return false; }
  }

  function saveState(key, value) {
    try { window.localStorage.setItem(key, value ? '1' : '0'); }
    catch (error) { return; }
  }

  document.querySelectorAll('.check-item[data-check]').forEach(function (button) {
    var key = 'saikende-study:' + button.getAttribute('data-check');
    var pressed = readState(key);
    button.setAttribute('aria-pressed', String(pressed));

    button.addEventListener('click', function () {
      pressed = button.getAttribute('aria-pressed') !== 'true';
      button.setAttribute('aria-pressed', String(pressed));
      saveState(key, pressed);
      updateGroup(button.closest('[data-check-group]'));
    });
  });

  function updateGroup(group) {
    if (!group) return;
    var items = group.querySelectorAll('.check-item[data-check]');
    var done = group.querySelectorAll('.check-item[aria-pressed="true"]').length;
    var output = group.querySelector('[data-check-count]');
    if (output) output.textContent = '本周完成 ' + done + ' / ' + items.length;
  }

  document.querySelectorAll('[data-check-group]').forEach(updateGroup);

  document.querySelectorAll('[data-print]').forEach(function (button) {
    button.addEventListener('click', function () { window.print(); });
  });
}());
