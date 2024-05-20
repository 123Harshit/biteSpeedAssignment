How to run the app - 
npm install
npm run dev


Deployed APP link - https://bite-speed-assignment-blue.vercel.app/

Key Points - 
1. I have used local storage to save and retrieve the latest flow created by user in case they close the tab/browser and want to retrieve the old flow.
2. I have used an error state to display errors while saving the flow in case any exist and they will be automatically disappearing in 3s.
3. There is a button you will find in "Nodes Panel" below "Message" Node named "Clear Current Flow" which deleted the existing flow and gives you a empty area to restart.
4. While creating new nodes if you are not positioning them after creation then they will be created on top of each other as I am not giving the x, y coordinates while creating the nodes.