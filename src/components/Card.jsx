import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

function BookCard(props) {
  const firebase = useFirebase();
  const [url, setURL] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    firebase.getImageURL(props.imageURL).then((url) => setURL(url));
  }, []);

  return (
    <Card className="rounded-xl font-medium m-6 max-w-xs shadow-lg">
      <Card.Img variant="top" src={url} className="h-48 object-cover" />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text className="font-normal">
          This Book Has A Title {props.name} & This Book Has A Price Of{" "}
          {props.price}
        </Card.Text>
        <Button onClick={(e) => navigate(props.link)} variant="primary"
          className="mt-3">
          View
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
