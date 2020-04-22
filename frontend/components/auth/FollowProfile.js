import { Button } from "@material-ui/core";
import { follow, unfollow } from "../../actions/user";


const FollowProfileButton = (props) => {
  const followClick = () => {
  
   props.onButtonClick(follow);
  };

  const unfollowClick = () => {
    props.onButtonClick(unfollow);
  };

  return (

    <div>
     

        <Button
          onClick={followClick}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
        >
          Follow
        </Button>

        <Button
          onClick={unfollowClick}
          variant="contained"
          color="secondary"
          size="large"
          type="submit"
        >
          Unfollow
        </Button>
    
    </div>
  );
};




export default FollowProfileButton;
