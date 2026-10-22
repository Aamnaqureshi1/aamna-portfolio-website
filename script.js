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
  var repo = "https://github.com/your-username";

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
      return '<article class="project tilt"><img src="https://picsum.photos/seed/' + p[4] + '/600/400" width="600" height="400" alt="Cover image for ' + p[0] + '" loading="lazy">' +
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
