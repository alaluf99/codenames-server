import { roomModel, userInRoomModel, roomStatus, teams, userInTeamType, IUserInRoom, IRoom , userInRoomSchema} from '../Model/roomModel';
import { Controller, Route, Get, Post, BodyProp, Put, Delete } from 'tsoa';
import { ICard } from '../Model/CardModel';

@Route('/rooms/init')
export class RoomsInitController extends Controller {

    @Post()
    public async initRoom(@BodyProp() room_id: string) : Promise<IRoom>{
        /** 
         * Room initiation sequence:
         * 1. Randomize groups
         * 2. Randomize Super-Spy
         * 3. Randomize Team Leader
         * 4. Randomize words
         * 5. Randomize cards
         **/

        let room = await roomModel.findById(room_id);
        room.status = roomStatus.INITIALIZE;
        room.save;
         
        let numOfUsersInRoom = room.users.length;

         //Room must have 6-20 users
         if (numOfUsersInRoom < 6 || numOfUsersInRoom > 20){
            this.setStatus(400);
            return;
         }
         
         //Randomize groups
         let usersArray = new Array<{
            user: IUserInRoom;
            randNumber: number;
        }>(numOfUsersInRoom);

        let randNumber = Array<number>(numOfUsersInRoom);
        for(let i = 0; i < numOfUsersInRoom; i++){
            randNumber[i] = Math.floor(Math.random()*100);
            usersArray.push({user: room.users[i],
                 randNumber: randNumber[i]});
        }
        
        let median = this.medianFunc(randNumber);
        usersArray.sort((a,b) => a.randNumber - b.randNumber);
        randNumber.sort((a,b) => a-b);
        let indexOfMaxRed = randNumber.findIndex(element => element > median)-1;
        
        usersArray.forEach(element => {
            if (element.randNumber > median){
                element.user.team = teams.BLUE;                
            }
            else{
                element.user.team = teams.RED;
            }
            element.user.userType = userInTeamType.REGULAR;
        });
        usersArray[indexOfMaxRed].user.userType = userInTeamType.SUPER_SPY;
        usersArray[indexOfMaxRed+1].user.userType = userInTeamType.TEAM_LEADER;
        usersArray[indexOfMaxRed].user.userType = userInTeamType.SUPER_SPY;
        usersArray[indexOfMaxRed+1].user.userType = userInTeamType.TEAM_LEADER;
        
        usersArray.forEach(element => {
            let idx = room.users.findIndex(element1 => element1.user_id == element.user.user_id);
            room.users[idx].team = element.user.team;
            room.users[idx].userType = element.user.userType;
        });

        await room.save();
        room.status = roomStatus.ACTIVE;
        return await room.save();

        
        
    }
    private medianFunc(arr: number[]): Number {
        const mid = Math.floor(arr.length/2);
        let nums = [...arr].sort((a, b) => a - b);
        return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    }
};