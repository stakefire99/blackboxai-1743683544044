// Geolocation and map functionality for TailTalks
document.addEventListener('DOMContentLoaded', function() {
    // Only run on vets page
    if (!document.getElementById('map')) return;

    const vetList = document.getElementById('vetList');
    const backBtn = document.getElementById('backBtn');

    // Mock vet data (in a real app, this would come from an API)
    const mockVets = [
        {
            name: "Paws & Care Veterinary Clinic",
            address: "123 Pet Street, Animal City",
            phone: "(555) 123-4567",
            distance: "0.3 miles",
            open: true
        },
        {
            name: "Animal Wellness Center",
            address: "456 Bark Avenue, Animal City",
            phone: "(555) 987-6543",
            distance: "0.5 miles",
            open: false
        }
    ];

    // Display mock vet data
    function displayVets() {
        vetList.innerHTML = mockVets.map(vet => `
            <div class="vet-card p-4 rounded-lg shadow-md border ${vet.open ? 'border-green-200' : 'border-red-200'}">
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="font-bold text-lg">${vet.name}</h3>
                        <p class="text-gray-600">${vet.address}</p>
                        <p class="text-gray-600">${vet.phone}</p>
                    </div>
                    <div class="text-right">
                        <span class="inline-block px-2 py-1 text-xs rounded-full ${vet.open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                            ${vet.open ? 'Open Now' : 'Closed'}
                        </span>
                        <p class="text-sm mt-1">${vet.distance} away</p>
                    </div>
                </div>
                ${vet.open ? `
                <div class="mt-3 flex justify-end">
                    <button class="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                        Call Now
                        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                    </button>
                </div>
                ` : ''}
            </div>
        `).join('');

        // In a real implementation, we would use the Google Maps API here
        document.getElementById('map').innerHTML = `
            <div class="w-full h-full flex items-center justify-center bg-gray-200">
                <div class="text-center p-4">
                    <svg class="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <p class="text-gray-600">Map would display here with real vet locations</p>
                    <p class="text-sm text-gray-500 mt-1">(Google Maps integration would be implemented in production)</p>
                </div>
            </div>
        `;
    }

    // Back button functionality
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = 'report.html';
        });
    }

    // Request geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Success - we would use these coordinates in a real app
                const { latitude, longitude } = position.coords;
                console.log(`User location: ${latitude}, ${longitude}`);
                displayVets();
            },
            (error) => {
                // Error - fallback to mock data
                console.error("Geolocation error:", error);
                displayVets();
            }
        );
    } else {
        // Geolocation not supported
        console.log("Geolocation not supported");
        displayVets();
    }
});