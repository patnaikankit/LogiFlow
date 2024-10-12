export const calculatePrice = (pickupLocation, dropOffLocation, vehicleType) => {
    const distance = getDistance(pickupLocation, dropOffLocation);  
    const basePrice = vehicleType === 'truck' ? 10 : 5;
    const demandMultiplier = getDemandMultiplier();  
  
    return distance * basePrice * demandMultiplier;
  };
  
  const getDistance = (pickup, dropoff) => {
    return Math.random()*50;  
  };
  
  const getDemandMultiplier = () => {
    return Math.random() + 1;  
  };
  