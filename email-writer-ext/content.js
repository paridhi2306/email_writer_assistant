

console.log("Email Writer Extension - Content Script Loaded")

// Configuration
const API_BASE_URL = "http://localhost:8080"
const API_ENDPOINT = `${API_BASE_URL}/api/email/generate`
const HEALTH_ENDPOINT = `${API_BASE_URL}/actuator/health`
const SIMPLE_HEALTH_ENDPOINT = `${API_BASE_URL}/health`

function createAIButton() {
  const button = document.createElement("div")
  button.className = "T-I J-J5-Ji aoO v7 T-I-atl L3"
  button.style.cssText = `
    margin-right: 8px;
    cursor: pointer;
    background-color: #1a73e8;
    color: white;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    border: none;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  `
  button.innerHTML = "🤖 AI Reply"
  button.setAttribute("role", "button")
  button.setAttribute("data-tooltip", "Generate AI Reply")
  button.setAttribute("title", "Generate AI Reply")
  return button
}

function getEmailContent() {
  const selectors = [
    ".h7",
    ".a3s.aiL",
    ".gmail_quote",
    '[role="presentation"]',
    ".ii.gt .a3s.aiL",
    ".adP .a3s.aiL",
    ".message .a3s",
    ".adn.ads .a3s.aiL",
  ]

  for (const selector of selectors) {
    const elements = document.querySelectorAll(selector)
    for (const element of elements) {
      const text = element.innerText?.trim()
      if (text && text.length > 10) {
        console.log("Found email content:", text.substring(0, 100) + "...")
        return text
      }
    }
  }

  return ""
}

function findComposeToolbar() {
  const selectors = [".btC", ".aDh", '[role="toolbar"]', ".gU.Up", ".Am.Al.editable", ".aoP", ".aaZ"]

  for (const selector of selectors) {
    const toolbar = document.querySelector(selector)
    if (toolbar && toolbar.offsetParent !== null) {
      return toolbar
    }
  }
  return null
}

async function testServerConnection() {
  console.log("🔍 Testing server connection...")

  // Test multiple endpoints to ensure connectivity
  const endpoints = [
    { url: HEALTH_ENDPOINT, name: "Actuator Health" },
    { url: SIMPLE_HEALTH_ENDPOINT, name: "Simple Health" },
    { url: `${API_BASE_URL}/`, name: "Root" },
  ]

  for (const endpoint of endpoints) {
    try {
      console.log(`Testing ${endpoint.name}: ${endpoint.url}`)

      const response = await fetch(endpoint.url, {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "omit",
      })

      console.log(`${endpoint.name} response:`, response.status, response.statusText)

      if (response.ok) {
        const data = await response.json()
        console.log(`✅ ${endpoint.name} successful:`, data)
        return {
          success: true,
          message: `Server is running (${endpoint.name})`,
          endpoint: endpoint.url,
          data: data,
        }
      }
    } catch (error) {
      console.error(`❌ ${endpoint.name} failed:`, error)
    }
  }

  return {
    success: false,
    message: "All health checks failed - Server may not be running or CORS issue",
  }
}

function showUserMessage(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".ai-reply-notification")
  existingNotifications.forEach((notification) => notification.remove())

  // Create a temporary notification
  const notification = document.createElement("div")
  notification.className = "ai-reply-notification"
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    z-index: 10000;
    padding: 16px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    max-width: 400px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    font-family: Arial, sans-serif;
    font-size: 14px;
    line-height: 1.4;
    ${type === "error" ? "background-color: #dc3545;" : "background-color: #28a745;"}
  `
  notification.textContent = message

  document.body.appendChild(notification)

  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification)
    }
  }, 6000)
}

function injectButton() {
  // Remove existing button
  const existingButton = document.querySelector(".ai-reply-button")
  if (existingButton) {
    existingButton.remove()
  }

  const toolbar = findComposeToolbar()
  if (!toolbar) {
    console.log("Compose toolbar not found")
    return
  }

  console.log("Injecting AI Reply button")
  const button = createAIButton()
  button.classList.add("ai-reply-button")

  button.addEventListener("click", async (event) => {
    event.preventDefault()
    event.stopPropagation()

    const originalText = button.innerHTML

    try {
      button.innerHTML = "🔄 Checking server..."
      button.style.opacity = "0.7"

      // Test server connection first
      const connectionTest = await testServerConnection()
      if (!connectionTest.success) {
        showUserMessage(
          `❌ Backend Error: ${connectionTest.message}\n\nTroubleshooting:\n1. Ensure Spring Boot is running: ./mvnw spring-boot:run\n2. Check port 8080 is not blocked\n3. Verify CORS configuration`,
          "error",
        )
        return
      }

      console.log("✅ Server connection successful:", connectionTest)
      button.innerHTML = "📧 Reading email..."

      // Get email content
      const emailContent = getEmailContent()
      if (!emailContent) {
        showUserMessage("⚠️ No email content found. Please open an email thread first.", "error")
        return
      }

      console.log("📧 Email content found, generating reply...")
      button.innerHTML = "✨ Generating reply..."

      // Generate reply
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/plain",
        },
        credentials: "omit",
        body: JSON.stringify({
          emailContent: emailContent,
          tone: "professional",
        }),
      })

      console.log("API Response:", response.status, response.statusText)

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`)
      }

      const generatedReply = await response.text()
      console.log("✅ Reply generated successfully")

      // Find compose box and insert reply
      const composeSelectors = [
        '[role="textbox"][g_editable="true"]',
        '.Am.Al.editable[role="textbox"]',
        '.editable[role="textbox"]',
        'div[contenteditable="true"]',
        ".Am.Al.editable",
      ]

      let composeBox = null
      for (const selector of composeSelectors) {
        composeBox = document.querySelector(selector)
        if (composeBox && composeBox.offsetParent !== null) {
          break
        }
      }

      if (composeBox) {
        composeBox.focus()
        composeBox.innerHTML = ""
        composeBox.innerText = generatedReply

        // Trigger events to notify Gmail
        composeBox.dispatchEvent(new Event("input", { bubbles: true }))
        composeBox.dispatchEvent(new Event("change", { bubbles: true }))

        showUserMessage("✅ AI reply generated and inserted successfully!", "success")
      } else {
        showUserMessage("⚠️ Could not find compose box. Please click in the reply area first.", "error")
      }
    } catch (error) {
      console.error("❌ Error generating reply:", error)
      showUserMessage(`❌ Error: ${error.message}`, "error")
    } finally {
      button.innerHTML = originalText
      button.style.opacity = "1"
    }
  })

  // Insert button at the beginning of toolbar
  toolbar.insertBefore(button, toolbar.firstChild)
}

// Enhanced observer for Gmail's dynamic content
const observer = new MutationObserver((mutations) => {
  let shouldInject = false

  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes)

    const hasComposeElements = addedNodes.some((node) => {
      if (node.nodeType !== Node.ELEMENT_NODE) return false

      return (
        node.matches &&
        (node.matches('.aDh, .btC, [role="dialog"], .nH.if, .nH.oy8Mbf, .aaZ') ||
          node.querySelector('.aDh, .btC, [role="dialog"], .nH.if, .nH.oy8Mbf, .aaZ'))
      )
    })

    if (hasComposeElements) {
      shouldInject = true
      break
    }
  }

  if (shouldInject) {
    console.log("Gmail compose window detected")
    setTimeout(injectButton, 1000)
  }
})

// Start observing
observer.observe(document.body, {
  childList: true,
  subtree: true,
})

// Also try to inject immediately if compose is already open
setTimeout(() => {
  if (findComposeToolbar()) {
    injectButton()
  }
}, 2000)

console.log("Email Writer Extension initialized successfully")

