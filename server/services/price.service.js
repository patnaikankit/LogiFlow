export const calculatePrice = (pickupLocation, dropOffLocation, vehicleType) => {
  const distance = getDistance(pickupLocation, dropOffLocation);
  let basePrice;

  // price per km
  switch (vehicleType) {
    case 'Truck':
      basePrice = 50;  
      break;
    case 'Train':
      basePrice = 100;  
      break;
    default:
      throw new Error('Invalid vehicle type');
  }

  const price = distance * basePrice;
  return parseFloat(price.toFixed(2));
};

const getDistance = (pickup, dropoff) => {
  return Math.random()*100;  
};

