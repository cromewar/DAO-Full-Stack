import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useGetState } from '../web3/useGetState';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useVoteProposal } from '../web3/VoteProposal';


export const VoteProposal = ({ lastId, signer }) => {

    const { getProposalState } = useGetState();

    const [proposalState, setProposalState] = useState(null);

    const { voteInProposal } = useVoteProposal();

    const [voteReason, setVoteReason] = useState();

    const handleVoteReason = (e) => {
        setVoteReason(e.target.value);
    }


    const getTheState = async () => {

        const state = await getProposalState(lastId);
        setProposalState(state);

    }

    useEffect(() => {
        getTheState();
    }, [proposalState])

    const handleVotingState = (e) => {

        const status = {
            "0": "Pending",
            "1": "Active",
            "2": "Canceled",
            "3": "Defeated",
            "4": "Succeeded",
            "5": "Queued",
            "6": "Expired",
            "7": "Executed"
        };
        return status[e] ?? "Unknown";
    }

    const shortId = lastId ? lastId.slice(0, 11) + "..." : 0;




    return (<>
        <CardContent >
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Current/Latest Voting
            </Typography>
            <Typography variant="h5" component="div">
                {shortId}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                The Proposal state is {handleVotingState(proposalState)}
            </Typography>

        </CardContent>
        {handleVotingState(proposalState) === "Active" ? <div>
            <TextField id="outlined-basic" label="reason" variant="outlined" sx={{ width: "100%" }} name="reason" onChange={handleVoteReason} defaultValue='' />
            <CardActions sx={{ justifyContent: "space-between", display: "flex" }}>
                <Button size="small" variant='outlined' onClick={() => {
                    voteInProposal(signer, lastId, 1, voteReason);
                }}>In Favor</Button>
                <Button size="small" variant='outlined' onClick={() => {
                    voteInProposal(signer, lastId, 0, voteReason);
                }}>Against</Button>
                <Button size="small" variant='outlined' onClick={() => {
                    voteInProposal(signer, lastId, 2, voteReason);
                }}>Abstain</Button>
            </CardActions>
        </div> : <p>Sorry Voting is not available</p>
        }
    </>)
}

// signer, proposalId, support, reason