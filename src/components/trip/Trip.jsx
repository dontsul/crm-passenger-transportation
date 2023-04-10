import { ListGroup } from 'bootstrap-4-react';
export const Trip = (props) => {
  console.log(props.trip);

  const { carNumber, fromTrip, passengers, whereTrip } = props.trip;
  return (
    <ListGroup.Item className="my-2">
      <div className="d-flex justify-content-space-between align-items-center ">
        <div className="w-25 text-center">Registration plates: {carNumber}</div>
        <div className="w-25 text-center">Passengers: {passengers}</div>
        <div className="w-25 text-center">From: {fromTrip}</div>
        <div className="w-25 text-center">To: {whereTrip}</div>
      </div>
    </ListGroup.Item>
  );
};
