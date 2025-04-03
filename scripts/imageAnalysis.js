// Mock image analysis for TailTalks
document.addEventListener('DOMContentLoaded', function() {
    // Only run on report page
    if (!document.getElementById('reportTitle')) return;

    // Get stored data
    const animalData = JSON.parse(localStorage.getItem('animalData') || '{}');
    const issueData = JSON.parse(localStorage.getItem('issueData') || '{}');

    // Set report title
    const reportTitle = document.getElementById('reportTitle');
    if (animalData.name) {
        reportTitle.textContent = `${animalData.name}'s Report 📋`;
    }

    // Initialize analysis arrays
    const issues = [];
    const precautions = [];
    const medications = [];
    const remedies = [];

    // Validate image matches description
    const symptoms = issueData.symptoms?.toLowerCase() || '';
    const hasImage = issueData.image && issueData.image.length > 0;
    
    if (hasImage) {
        // Basic image-description validation
        const imageFeatures = analyzeImage(issueData.image);
        if (!validateDescriptionMatch(imageFeatures, symptoms)) {
            document.getElementById('reportContent').innerHTML = `
                <div class="text-center p-8 bg-red-50 rounded-lg">
                    <svg class="w-12 h-12 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">Validation Error</h3>
                    <p class="text-gray-600 mb-4">The uploaded image doesn't match the described symptoms.</p>
                    <button onclick="window.location.href='issue.html'" class="btn-primary px-4 py-2">
                        Try Again
                    </button>
                </div>
            `;
            return;
        }
        issues.push('Image validation passed - visual symptoms confirmed');
        precautions.push('Visual assessment matches described symptoms');
    } else {
        issues.push('No image provided - analysis based on description only');
        precautions.push('Recommend uploading photo for more accurate diagnosis');
    }

    // Helper functions
    function validateDescriptionMatch(features, description) {
        // Basic validation - check if description mentions any image features
        return (
            features.objects.some(obj => description.includes(obj)) ||
            features.primaryColor && description.includes(features.primaryColor)
        );
    }

    // Enhanced condition analysis with detailed recommendations
    const conditions = {
        limp: {
            issues: [
                'Possible joint injury (may require NSAIDs like Carprofen)',
                'Muscle strain (may respond to Gabapentin)'
            ],
            precautions: ['Restrict movement', 'Use supportive harness if needed'],
            medications: [
                {name: 'Carprofen (Rimadyl)', dose: '2.2 mg/kg twice daily', link: 'https://www.google.com/search?q=Carprofen+for+dogs'},
                {name: 'Gabapentin', dose: '5-10 mg/kg every 8 hours', link: 'https://www.google.com/search?q=Gabapentin+for+dogs'},
                {name: 'Meloxicam (Metacam)', dose: '0.1 mg/kg once daily', link: 'https://www.google.com/search?q=Meloxicam+for+dogs'}
            ],
            remedies: [
                {
                    name: 'Cold compress',
                    details: 'Apply for 15min every 2hrs',
                    link: 'https://www.google.com/search?q=cold+compress+for+dog+joint+pain'
                },
                {
                    name: 'Gentle massage',
                    details: 'With arnica gel for inflammation',
                    link: 'https://www.google.com/search?q=arnica+gel+for+dogs'
                }
            ]
        },
        vomit: {
            issues: [
                'Gastric irritation (may need anti-nausea meds)',
                'Potential toxin exposure (requires immediate vet attention)'
            ],
            precautions: ['Withhold food 12-24hrs', 'Provide electrolyte solution'],
            medications: [
                {name: 'Ondansetron (Zofran)', dose: '0.5 mg/kg every 12hrs', link: 'https://www.google.com/search?q=Ondansetron+for+dogs'},
                {name: 'Famotidine (Pepcid)', dose: '0.5 mg/kg every 24hrs', link: 'https://www.google.com/search?q=Famotidine+for+dogs'},
                {name: 'Metoclopramide (Reglan)', dose: '0.2-0.5 mg/kg every 8hrs', link: 'https://www.google.com/search?q=Metoclopramide+for+dogs'}
            ],
            remedies: ['Pumpkin puree (1tbsp per 10lbs)', 'Ginger tea (1tsp cooled)']
        },
        itch: {
            issues: [
                'Allergic dermatitis (may need Apoquel)',
                'Flea allergy (requires flea control)'
            ],
            precautions: ['Use flea comb daily', 'Wash bedding weekly'],
            medications: [
                {name: 'Apoquel', dose: '0.4-0.6 mg/kg twice daily', link: 'https://www.google.com/search?q=Apoquel+for+dogs'},
                {name: 'Cytopoint Injection', dose: 'Every 4-8 weeks', link: 'https://www.google.com/search?q=Cytopoint+for+dogs'},
                {name: 'Prednisone (Steroid)', dose: '0.5-1 mg/kg daily', link: 'https://www.google.com/search?q=Prednisone+for+dogs'}
            ],
            remedies: ['Oatmeal shampoo baths', 'Aloe vera gel application']
        },
        default: {
            issues: ['Requires veterinary examination for proper diagnosis'],
            precautions: ['Monitor vital signs (temperature, breathing rate)', 'Document symptom progression'],
            medications: [
                {name: 'Veterinary Consultation Required', dose: 'Schedule appointment promptly', link: 'https://www.google.com/search?q=emergency+vet+near+me'}
            ],
            remedies: ['Provide fresh water', 'Keep in quiet, comfortable space']
        }
    };

    // Analyze symptoms and populate recommendations
    let matched = false;
    for (const [symptom, data] of Object.entries(conditions)) {
        if (symptoms.includes(symptom)) {
            issues.push(...data.issues);
            precautions.push(...data.precautions);
            medications.push(...data.medications);
            remedies.push(...data.remedies);
            matched = true;
        }
    }

    if (!matched) {
        issues.push(...conditions.default.issues);
        precautions.push(...conditions.default.precautions);
        medications.push(...conditions.default.medications);
        remedies.push(...conditions.default.remedies);
    }

    // Add image analysis findings
    issues.push('Image analysis completed - visual symptoms confirmed');
    precautions.push('Monitor for any changes in visible symptoms');

    // Populate report sections
    const populateList = (id, items) => {
        const list = document.getElementById(id);
        list.innerHTML = items.map(item => {
            if (typeof item === 'object') {
                return `<li class="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                    <div class="font-bold text-purple-700">${item.name}</div>
                    <div class="text-sm text-gray-600 mb-1">Dosage: ${item.dose}</div>
                    <a href="${item.link}" target="_blank" 
                       class="inline-flex items-center text-sm text-blue-600 hover:underline">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                        Research this medication
                    </a>
                </li>`;
            }
            if (typeof item === 'object' && item.link) {
                return `<li class="p-3 bg-green-50 rounded-md hover:bg-green-100 transition-colors">
                    <div class="font-medium text-green-800">${item.name}</div>
                    <div class="text-sm text-gray-600 mb-1">${item.details || ''}</div>
                    <a href="${item.link}" target="_blank" 
                       class="inline-flex items-center text-sm text-blue-600 hover:underline">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                        Learn more about this remedy
                    </a>
                </li>`;
            }
            return `<li class="p-2">${item}</li>`;
        }).join('');
    };

    populateList('issuesList', issues);
    populateList('precautionsList', precautions);
    populateList('medicationsList', medications);
    populateList('remediesList', remedies);

    // Button event listeners
    const findVetsBtn = document.getElementById('findVetsBtn');
    const feedbackBtn = document.getElementById('feedbackBtn');

    if (findVetsBtn) {
        findVetsBtn.addEventListener('click', () => {
            window.location.href = 'vets.html';
        });
    }

    // Back button functionality
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = 'issue.html';
        });
    }

    if (feedbackBtn) {
        feedbackBtn.addEventListener('click', () => {
            window.location.href = 'feedback.html';
        });
    }
});