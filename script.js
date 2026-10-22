(function () {
  var root = document.documentElement;
  var $ = function (id) { return document.getElementById(id); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme ---------- */
  var themeBtn = $("themeBtn");
  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    themeBtn.textContent = t === "dark" ? "Light mode" : "Dark mode";
    themeBtn.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  applyTheme(saved || "dark");
  themeBtn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  /* ---------- Mobile menu ---------- */
  var nav = $("nav"), menuBtn = $("menuBtn");
  menuBtn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); });
  });
  $("year").textContent = new Date().getFullYear();

  /* ---------- Data: edit these to match your real work ---------- */
  var skills = [
    ["Web basics", "HTML, CSS, JavaScript", 85],
    ["Version control", "Git, GitHub", 80],
    ["Programming", "C++, Python, Java", 75],
    ["Cloud and DevOps", "Linux, Docker, CI/CD (learning)", 55]
  ];
  var projects = [
    ["Personal portfolio website", "A 3D static site published on GitHub.", "Web", ["HTML", "CSS", "Three.js"], "portfolio"],
    ["Student management system", "Store and search student records.", "Web", ["Java", "MySQL"], "students"],
    ["Weather dashboard", "Forecast for any city from a public API.", "Web", ["JavaScript", "API"], "weather"],
    ["Docker web server", "A containerised Nginx site with a simple pipeline.", "Cloud", ["Docker", "Linux"], "docker"],
    ["CI/CD pipeline demo", "Automatic tests on every push with GitHub Actions.", "Cloud", ["GitHub Actions", "Git"], "pipeline"],
    ["Cloud file storage", "Upload and share files from a small cloud app.", "Cloud", ["Python", "AWS S3"], "storage"],
    ["Face mask detector", "Detects masks in images with a trained model.", "AI", ["Python", "OpenCV"], "mask"],
    ["Spam email classifier", "Sorts emails into spam and not spam.", "AI", ["Python", "scikit-learn"], "spam"],
    ["Study chatbot", "Answers common course questions.", "AI", ["Python", "NLP"], "chatbot"]
  ];
  var repo = "https://github.com/Aamnaqureshi1";

  /* ---------- Project cover art (relevant illustrations, works offline) ---------- */
  var themes = { Web: ["#123a6b", "#3b7ddd"], Cloud: ["#0b4f5c", "#2fbfa8"], AI: ["#4a2a6b", "#f0a431"] };
  var cloud = '<g fill="#fff"><circle cx="240" cy="230" r="42"/><circle cx="305" cy="212" r="56"/><circle cx="370" cy="234" r="38"/><rect x="240" y="232" width="130" height="40"/></g>';
  var icons = {
    portfolio: '<rect x="170" y="110" width="260" height="180" rx="12" fill="#fff" fill-opacity=".92"/><rect x="170" y="110" width="260" height="30" rx="12" fill="#fff"/><circle cx="190" cy="125" r="5" fill="#f0a431"/><circle cx="208" cy="125" r="5" fill="#2fbfa8"/><rect x="190" y="160" width="120" height="14" rx="4" fill="#123a6b"/><rect x="190" y="185" width="200" height="8" rx="4" fill="#9fb0c8"/><rect x="190" y="203" width="170" height="8" rx="4" fill="#9fb0c8"/><rect x="190" y="235" width="70" height="26" rx="6" fill="#f0a431"/>',
    students: '<rect x="220" y="130" width="160" height="130" fill="#fff"/><ellipse cx="300" cy="260" rx="80" ry="22" fill="#fff"/><ellipse cx="300" cy="130" rx="80" ry="22" fill="#fff"/><path d="M220 175q80 40 160 0M220 215q80 40 160 0" stroke="#3b7ddd" stroke-width="5" fill="none"/>',
    weather: '<circle cx="360" cy="150" r="44" fill="#f0a431"/>' + cloud,
    docker: '<g fill="#fff"><rect x="190" y="190" width="50" height="40" rx="4"/><rect x="248" y="190" width="50" height="40" rx="4"/><rect x="306" y="190" width="50" height="40" rx="4"/><rect x="248" y="142" width="50" height="40" rx="4"/><rect x="306" y="142" width="50" height="40" rx="4"/></g><path d="M170 245h235c-20 40-80 62-150 52-45-7-72-26-85-52z" fill="#fff" fill-opacity=".92"/>',
    pipeline: '<g fill="#fff"><circle cx="180" cy="200" r="34"/><circle cx="300" cy="200" r="34"/><circle cx="420" cy="200" r="34"/></g><path d="M218 200h44M338 200h44" stroke="#fff" stroke-width="8" stroke-linecap="round"/><path d="M405 200l12 12 22-26" stroke="#2fbfa8" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    storage: cloud + '<path d="M305 262v-58M283 226l22-22 22 22" stroke="#0b4f5c" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    mask: '<circle cx="300" cy="190" r="80" fill="#fff"/><circle cx="270" cy="165" r="9" fill="#4a2a6b"/><circle cx="330" cy="165" r="9" fill="#4a2a6b"/><rect x="245" y="195" width="110" height="55" rx="20" fill="#2fbfa8"/><path d="M245 212h-25M355 212h25" stroke="#fff" stroke-width="6"/><path d="M200 120v-30h30M400 120v-30h-30M200 260v30h30M400 260v30h-30" stroke="#f0a431" stroke-width="7" fill="none" stroke-linecap="round"/>',
    spam: '<rect x="190" y="140" width="220" height="140" rx="12" fill="#fff"/><path d="M190 150l110 80 110-80" stroke="#4a2a6b" stroke-width="7" fill="none"/><circle cx="410" cy="140" r="30" fill="#e5484d"/><path d="M398 128l24 24M422 128l-24 24" stroke="#fff" stroke-width="6" stroke-linecap="round"/>',
    chatbot: '<rect x="180" y="120" width="190" height="90" rx="22" fill="#fff"/><path d="M215 208l-5 37 40-37z" fill="#fff"/><g fill="#4a2a6b"><circle cx="240" cy="165" r="9"/><circle cx="275" cy="165" r="9"/><circle cx="310" cy="165" r="9"/></g><rect x="260" y="235" width="170" height="64" rx="22" fill="#f0a431"/>'
  };
  function cover(key, cat) {
    var t = themes[cat] || themes.Web;
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + t[0] + '"/><stop offset="1" stop-color="' + t[1] + '"/></linearGradient></defs><rect width="600" height="400" fill="url(#g)"/><circle cx="520" cy="60" r="90" fill="#fff" fill-opacity=".08"/><circle cx="60" cy="360" r="110" fill="#fff" fill-opacity=".08"/>' + (icons[key] || "") + "</svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  /* ---------- Skills ---------- */
  $("skillList").innerHTML = skills.map(function (s) {
    return "<li><strong>" + s[0] + "</strong>" + s[1] + '<div class="bar"><i data-w="' + s[2] + '"></i></div></li>';
  }).join("");

  /* ---------- Projects with filters ---------- */
  var grid = $("projectGrid"), filters = $("filters");
  var cats = ["All"].concat(projects.map(function (p) { return p[2]; }).filter(function (c, i, a) { return a.indexOf(c) === i; }));
  filters.innerHTML = cats.map(function (c, i) {
    return '<button class="filter" data-cat="' + c + '" aria-pressed="' + (i === 0) + '">' + c + "</button>";
  }).join("");
  function render(cat) {
    grid.innerHTML = projects.filter(function (p) { return cat === "All" || p[2] === cat; }).map(function (p) {
      return '<article class="project tilt"><img src="' + cover(p[4], p[2]) + '" width="600" height="400" alt="Illustration for ' + p[0] + '" loading="lazy">' +
        '<div class="body"><h3>' + p[0] + "</h3><p>" + p[1] + '</p><ul class="tags">' +
        p[3].map(function (t) { return "<li>" + t + "</li>"; }).join("") +
        '</ul><a href="' + repo + '" target="_blank" rel="noopener">View on GitHub</a></div></article>';
    }).join("");
    bindTilt();
  }
  filters.addEventListener("click", function (e) {
    var b = e.target.closest(".filter"); if (!b) return;
    filters.querySelectorAll(".filter").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
    render(b.dataset.cat);
  });

  /* ---------- 3D card tilt ---------- */
  function bindTilt() {
    if (reduce) return;
    document.querySelectorAll(".tilt").forEach(function (el) {
      if (el.dataset.tilt) return; el.dataset.tilt = "1";
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        el.style.transform = "rotateY(" + (x * 14) + "deg) rotateX(" + (-y * 14) + "deg) translateZ(10px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }
  render("All");

  /* ---------- Reveal: skill bars and counters ---------- */
  function animateIn(el) {
    if (el.matches(".bar i")) el.style.width = el.dataset.w + "%";
    if (el.matches("[data-count]")) {
      var target = +el.dataset.count, n = 0, step = Math.max(1, Math.ceil(target / 40));
      var t = setInterval(function () { n = Math.min(target, n + step); el.textContent = n; if (n >= target) clearInterval(t); }, 30);
    }
  }
  var targets = document.querySelectorAll(".bar i, [data-count]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { animateIn(en.target); io.unobserve(en.target); } });
    }, { threshold: .4 });
    targets.forEach(function (t) { io.observe(t); });
  } else { targets.forEach(animateIn); }

  /* ---------- Three.js background ---------- */
  var canvas = $("bg3d");
  if (!window.THREE || reduce) { canvas.style.display = "none"; return; }
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(60, 1, .1, 100); camera.position.z = 14;
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  var shapes = [], geos = [new THREE.IcosahedronGeometry(1.6, 0), new THREE.OctahedronGeometry(1.3), new THREE.TorusKnotGeometry(.9, .28, 80, 12), new THREE.BoxGeometry(1.6, 1.6, 1.6)];
  var colors = [0x7fb0f0, 0xf0a431, 0x5fd4c4];
  for (var i = 0; i < 9; i++) {
    var m = new THREE.Mesh(geos[i % geos.length], new THREE.MeshBasicMaterial({ color: colors[i % 3], wireframe: true, transparent: true, opacity: .55 }));
    m.position.set((Math.random() - .5) * 26, (Math.random() - .5) * 16, (Math.random() - .5) * 8 - 2);
    m.userData.spin = [Math.random() * .006 + .002, Math.random() * .006 + .002];
    scene.add(m); shapes.push(m);
  }
  var pts = new Float32Array(600 * 3);
  for (var j = 0; j < pts.length; j++) pts[j] = (Math.random() - .5) * 40;
  var pg = new THREE.BufferGeometry(); pg.setAttribute("position", new THREE.BufferAttribute(pts, 3));
  var stars = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xa3b2c9, size: .06 }));
  scene.add(stars);

  function resize() { renderer.setSize(window.innerWidth, window.innerHeight, false); camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); }
  window.addEventListener("resize", resize); resize();
  var mx = 0, my = 0, sy = 0;
  window.addEventListener("mousemove", function (e) { mx = e.clientX / window.innerWidth - .5; my = e.clientY / window.innerHeight - .5; });
  window.addEventListener("scroll", function () { sy = window.scrollY; });
  (function loop() {
    shapes.forEach(function (s) { s.rotation.x += s.userData.spin[0]; s.rotation.y += s.userData.spin[1]; });
    stars.rotation.y += .0004;
    camera.position.x += (mx * 4 - camera.position.x) * .04;
    camera.position.y += (-my * 3 - sy * .004 - camera.position.y) * .04;
    camera.lookAt(0, camera.position.y * .3, 0);
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  })();
})();