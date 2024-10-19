~This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
#1 Make Sure you have already downloaded the node This application has been developed on Node 20.xx <br>
#2 Click on the code button on this repo and copy the http link. <br>
#3 Open a folder the do cmd in the path section after that a terminal will open.<br>
#4 use this command
  "git clone (after it paste the link you copied, Dont forget space)" .<br>
#5 now go to the folder Task Management. <br>
#6 Open it with any code editor which can run node I prefer VS Code. <br>
#7 Do "npm install". <br>
#8 start it with "npm run dev". <br>

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Approach used for development application
#1 . Creating a new next application and opened it in vs code. <br>
#2 . For server side rendering created tasks in index.js
#3 . Showing the list in the form of table. <br>
#4 . Above the table enough room for Search the task. show count and a button for Creating New Task <br>
#5 . Identified the button as the common component and that will be used multiple times.<br>
#6 . After that made component by making it like a table for each Table it's rows. <br>
#7 . Coloring the row on the basis of priority. <br>
#8 . In the optional approach when i tried for use for local storage it created some problems like setting up the local storage when i setup the local storage at the correct place but   
     it was not keeping the tasks on reload because it was setting up again to the initial tasks.
     So i decided to redner it first time with SSR and after that on CSR. <br>
#9 . After that i made the functions for adding Tasks, Updating Task , Updating Status of task with button toggling and synced them with the local storage again.<br>
#10. After that i went for sorting it along with search functionality and keeping the completed task at bottom. for completed task i added the bg color of row to white so that it can be      easily identified.<br>
#11. Syncing all them together along with ids and updating everytime it needs to be updated.
#12. For search i used the approach for rendering from a copy of all objects so that the originals remains unharmed while searching.

