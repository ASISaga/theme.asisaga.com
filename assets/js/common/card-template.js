// Load YAML Parsing Library Dynamically
const jsyamlScript = document.createElement("script");
jsyamlScript.src = "https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js";
document.head.appendChild(jsyamlScript);

// Function to fetch the card template
async function fetchCardTemplate() {
  try {
    const response = await fetch('card-template.html'); // Fetch the card template
    return await response.text(); // Return the template as text
  } catch (error) {
    console.error("Error fetching card template:", error);
  }
}

// Function to load YAML data
async function loadYAML() {
  try {
    const response = await fetch('products.yml'); // Fetch the YAML file
    const yamlText = await response.text(); // Convert the response to text
    const data = jsyaml.load(yamlText); // Parse YAML into a JavaScript object
    return data;
  } catch (error) {
    console.error("Error loading YAML:", error);
  }
}

// Function to generate cards dynamically
async function generateCards() {
  const data = await loadYAML();
  const container = document.getElementById("productCardsContainer");
  const cardTemplate = await fetchCardTemplate();

  if (data && data.products && cardTemplate) {
    data.products.forEach(product => {
      // Replace placeholders with product data
      const cardHtml = cardTemplate
        .replace(/{name}/g, product.name)
        .replace(/{image}/g, product.image)
        .replace(/{summary}/g, product.summary)
        .replace(/{url}/g, product.url);

      // Append the populated card to the container
      container.innerHTML += cardHtml;
    });
  }
}

// Generate cards on page load
window.addEventListener("load", generateCards);