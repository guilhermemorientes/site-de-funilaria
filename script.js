document.addEventListener("DOMContentLoaded", () => {
  // State
  let activeSection = "hero"
  let selectedFilter = "funilaria"
  let isMenuOpen = false

  // DOM Elements
  const mobileMenuButton = document.querySelector(".mobile-menu-button")
  const mobileMenu = document.querySelector(".mobile-menu")
  const menuIcon = document.querySelector(".menu-icon")
  const closeIcon = document.querySelector(".close-icon")
  const navLinks = document.querySelectorAll(".nav-link")
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
  const filterButtons = document.querySelectorAll(".gallery-filter-btn")
  const accordionHeaders = document.querySelectorAll(".accordion-header")
  const galleryImage = document.getElementById("gallery-image")
  const galleryTitle = document.getElementById("gallery-title")
  const galleryDescription = document.getElementById("gallery-description")
  const contactForm = document.getElementById("contact-form")

  // Gallery Data
  const galleryItems = {
    funilaria: {
      image: "https://images.pexels.com/photos/305070/pexels-photo-305070.jpeg",
      title: "Funilaria de Alta Precisão",
      description: "Reparo estrutural com tecnologia avançada",
    },
    pintura: {
      image: "https://images.pexels.com/photos/6872577/pexels-photo-6872577.jpeg",
      title: "Pintura Automotiva Premium",
      description: "Acabamento profissional com tintas de primeira linha",
    },
    martelinho: {
      image: "https://images.pexels.com/photos/6872150/pexels-photo-6872150.jpeg",
      title: "Martelinho de Ouro Especializado",
      description: "Técnica especializada sem danificar a pintura original",
    },
    polimento: {
      image: "https://images.pexels.com/photos/14231701/pexels-photo-14231701.jpeg",
      title: "Polimentos Técnicos de Alto Nível",
      description: "Restauração do brilho e proteção da pintura",
    },
  }

  // Smooth Scroll Function
  function smoothScrollToSection(sectionId) {
    const targetElement = document.getElementById(sectionId)
    if (!targetElement) return

    const navbarHeight = 80
    const elementPosition = targetElement.offsetTop
    const offsetPosition = elementPosition - navbarHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })

    if (isMenuOpen) toggleMobileMenu()
  }

  // Mobile Menu Toggle
  function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen

    if (isMenuOpen) {
      mobileMenu.classList.remove("hidden")
      menuIcon.classList.add("hidden")
      closeIcon.classList.remove("hidden")
    } else {
      mobileMenu.classList.add("hidden")
      menuIcon.classList.remove("hidden")
      closeIcon.classList.add("hidden")
    }
  }

  // Update Active Section
  function updateActiveSection() {
    const sections = ["hero", "servicos", "diferenciais", "galeria", "contato", "faq"]
    const scrollPosition = window.scrollY + 100

    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) {
        const offsetTop = element.offsetTop
        const offsetHeight = element.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          if (activeSection !== section) {
            activeSection = section
            updateNavLinks()
          }
          break
        }
      }
    }
  }

  // Update Navigation Links
  function updateNavLinks() {
    ;[...navLinks, ...mobileNavLinks].forEach((link) => {
      const section = link.getAttribute("data-section")
      link.classList.toggle("active", section === activeSection)
    })
  }

  // Gallery Filter
  function changeGalleryFilter(filter) {
    selectedFilter = filter

    filterButtons.forEach((btn) => {
      const btnFilter = btn.getAttribute("data-filter")
      btn.classList.toggle("active", btnFilter === filter)
    })

    const item = galleryItems[filter]
    galleryImage.src = item.image
    galleryImage.alt = item.title
    galleryTitle.textContent = item.title
    galleryDescription.textContent = item.description
  }

  // Accordion Toggle
  function toggleAccordion() {
    const content = this.nextElementSibling
    const isActive = this.classList.contains("active")

    accordionHeaders.forEach((header) => {
      header.classList.remove("active")
      header.nextElementSibling.classList.remove("active")
    })

    if (!isActive) {
      this.classList.add("active")
      content.classList.add("active")
    }
  }

  // Form Submit
  function handleContactFormSubmit(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const name = formData.get("name") || document.getElementById("name").value
    const phone = formData.get("phone") || document.getElementById("phone").value
    const email = formData.get("email") || document.getElementById("email").value
    const service = formData.get("service") || document.getElementById("service").value
    const message = formData.get("message") || document.getElementById("message").value

    if (!name || !phone || !email || !service || !message) {
      alert("Por favor, preencha todos os campos obrigatórios.")
      return
    }

    alert("Formulário enviado com sucesso! Entraremos em contato em breve.")
    e.target.reset()
  }

  // Event Listeners
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", toggleMobileMenu)
  }
  // Navigation Links
  ;[...navLinks, ...mobileNavLinks].forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const section = link.getAttribute("data-section")
      smoothScrollToSection(section)
    })
  })

  // CTA Button - CORREÇÃO DEFINITIVA
  const heroCtaBtn = document.getElementById("hero-cta-btn")
  if (heroCtaBtn) {
    // Múltiplas formas de garantir que funcione
    heroCtaBtn.addEventListener("click", (e) => {
      e.preventDefault()
      e.stopPropagation()
      console.log("CTA Button clicked via addEventListener")
      smoothScrollToSection("contato")
    })

    heroCtaBtn.onclick = (e) => {
      e.preventDefault()
      e.stopPropagation()
      console.log("CTA Button clicked via onclick")
      smoothScrollToSection("contato")
    }

    // Garantir que o botão seja visível e clicável
    heroCtaBtn.style.position = "relative"
    heroCtaBtn.style.zIndex = "999"
    heroCtaBtn.style.pointerEvents = "auto"
  }

  // Gallery Filters
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter")
      changeGalleryFilter(filter)
    })
  })

  // Accordion
  accordionHeaders.forEach((header) => {
    header.addEventListener("click", toggleAccordion)
  })

  // Contact Form
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactFormSubmit)
  }

  // Scroll Event
  let scrollTimeout
  window.addEventListener("scroll", () => {
    if (scrollTimeout) clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(updateActiveSection, 10)
  })

  // Initialize
  updateActiveSection()

  // Debug: Verificar se o botão CTA existe
  console.log("Hero CTA Button found:", !!heroCtaBtn)
  if (heroCtaBtn) {
    console.log("Button styles:", {
      position: getComputedStyle(heroCtaBtn).position,
      zIndex: getComputedStyle(heroCtaBtn).zIndex,
      pointerEvents: getComputedStyle(heroCtaBtn).pointerEvents,
    })
  }
})
