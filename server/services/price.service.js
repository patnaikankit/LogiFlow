export const calculatePrice = (pickupLocation, dropOffLocation, vehicleType) => {
  const distance = getDistance(pickupLocation, dropOffLocation);
  let basePrice;

  // price per km
  switch (vehicleType) {
    case 'truck':
      basePrice = 50;  
      break;
    case 'train':
      basePrice = 100;  
      break;
    default:
      throw new Error('Invalid vehicle type');
  }

  return distance * basePrice ;
};

const getDistance = (pickup, dropoff) => {
  return Math.random()*100;  
};

