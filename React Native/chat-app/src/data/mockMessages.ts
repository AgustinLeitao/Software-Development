export interface MockMessage {
  id: string;
  text: string;
  imageUri?: string;
  timestamp: string;
  isSentByMe: boolean;
  isRead: boolean;
}

export const MOCK_MESSAGES: Record<string, MockMessage[]> = {
  '1': [
    { id: '1-1', text: 'Hey! How are you doing?', timestamp: '10:30 AM', isSentByMe: false, isRead: true },
    { id: '1-2', text: 'I am doing well, thanks! Are we still meeting for coffee today?', timestamp: '10:35 AM', isSentByMe: false, isRead: true },
    { id: '1-3', text: 'Absolutely. The usual place at noon?', timestamp: '10:38 AM', isSentByMe: true, isRead: true },
    { id: '1-4', text: 'Hey, are we still meeting for coffee today?', timestamp: '10:42 AM', isSentByMe: false, isRead: false },
  ],
  '2': [
    { id: '2-1', text: 'I pushed the latest changes to the feature branch.', timestamp: '09:02 AM', isSentByMe: false, isRead: true },
    { id: '2-2', text: 'Nice, I will take a look now.', timestamp: '09:05 AM', isSentByMe: true, isRead: true },
    { id: '2-3', text: 'The tests are passing locally as well.', timestamp: '09:10 AM', isSentByMe: false, isRead: true },
    { id: '2-4', text: 'Sounds great! I will review the pull request shortly.', timestamp: '09:15 AM', isSentByMe: true, isRead: true },
  ],
  '3': [
    { id: '3-1', text: 'The first round of screens is ready for review.', timestamp: 'Yesterday', isSentByMe: false, isRead: true },
    { id: '3-2', text: 'The navigation flow looks good. I left a few notes in Figma.', timestamp: 'Yesterday', isSentByMe: true, isRead: true },
    { id: '3-3', text: 'I will address those before the design review.', timestamp: 'Yesterday', isSentByMe: false, isRead: true },
    { id: '3-4', text: 'David: Updated Figma prototypes have been uploaded.', timestamp: 'Yesterday', isSentByMe: false, isRead: false },
  ],
  '4': [
    { id: '4-1', text: 'Did you see the new office layout?', timestamp: 'Yesterday', isSentByMe: false, isRead: true },
    { id: '4-2', text: 'Yes. I am claiming the desk by the window.', timestamp: 'Yesterday', isSentByMe: true, isRead: true },
    { id: '4-3', text: 'That is what she said! 😂', timestamp: 'Yesterday', isSentByMe: false, isRead: true },
  ],
  '5': [
    { id: '5-1', text: 'I sent over the notes from our meeting.', timestamp: 'Mon', isSentByMe: false, isRead: true },
    { id: '5-2', text: 'Got them, and the action items are clear.', timestamp: 'Mon', isSentByMe: true, isRead: true },
    { id: '5-3', text: 'Thanks for the quick update! See you tomorrow.', timestamp: 'Mon', isSentByMe: true, isRead: true },
  ],
  '6': [
    { id: '6-1', text: 'Has anyone tested the new release candidate?', timestamp: 'Mon', isSentByMe: false, isRead: true },
    { id: '6-2', text: 'I tested it on Android and everything looks good so far.', timestamp: 'Mon', isSentByMe: true, isRead: true },
    { id: '6-3', text: 'Carlos: Has anyone tried the new React Native release?', timestamp: 'Mon', isSentByMe: false, isRead: false },
  ],
  '7': [
    { id: '7-1', text: 'The client asked for the latest project files.', timestamp: 'Sun', isSentByMe: false, isRead: true },
    { id: '7-2', text: 'I will gather everything into one folder.', timestamp: 'Sun', isSentByMe: true, isRead: true },
    { id: '7-3', text: 'Can you send over the project documents?', timestamp: 'Sun', isSentByMe: false, isRead: true },
  ],
  '8': [
    { id: '8-1', text: 'My flight is boarding soon.', timestamp: 'Sun', isSentByMe: true, isRead: true },
    { id: '8-2', text: 'Have a safe flight! Send me a message when you arrive.', timestamp: 'Sun', isSentByMe: false, isRead: true },
    { id: '8-3', text: 'Let me know when you land!', timestamp: 'Sun', isSentByMe: false, isRead: false },
  ],
  '9': [
    { id: '9-1', text: 'What time should we meet on Sunday?', timestamp: 'Sat', isSentByMe: true, isRead: true },
    { id: '9-2', text: 'Dinner will be ready around 7 PM.', timestamp: 'Sat', isSentByMe: false, isRead: true },
    { id: '9-3', text: 'Mom: Don\'t forget dinner this Sunday at 7 PM!', timestamp: 'Sat', isSentByMe: false, isRead: false },
  ],
  '10': [
    { id: '10-1', text: 'Did you get the setup instructions?', timestamp: 'Fri', isSentByMe: false, isRead: true },
    { id: '10-2', text: 'Yes, I followed them and everything is working.', timestamp: 'Fri', isSentByMe: true, isRead: true },
    { id: '10-3', text: 'Got it, thanks man! 👍', timestamp: 'Fri', isSentByMe: true, isRead: true },
  ],
  '11': [
    { id: '11-1', text: 'The presentation is nearly finished.', timestamp: 'Fri', isSentByMe: false, isRead: true },
    { id: '11-2', text: 'Great. I can review it before the meeting.', timestamp: 'Fri', isSentByMe: true, isRead: true },
    { id: '11-3', text: 'I just shared the presentation with you.', timestamp: 'Fri', isSentByMe: false, isRead: true },
  ],
  '12': [
    { id: '12-1', text: 'The campaign dashboard is updated.', timestamp: 'Thu', isSentByMe: false, isRead: true },
    { id: '12-2', text: 'The engagement numbers are better than expected.', timestamp: 'Thu', isSentByMe: true, isRead: true },
    { id: '12-3', text: 'Rachel: The campaign results are looking awesome 🚀', timestamp: 'Thu', isSentByMe: false, isRead: true },
  ],
  '13': [
    { id: '13-1', text: 'I have a quick question about the new task.', timestamp: 'Thu', isSentByMe: false, isRead: true },
    { id: '13-2', text: 'Sure, I am free for the next few minutes.', timestamp: 'Thu', isSentByMe: true, isRead: true },
    { id: '13-3', text: 'Are you free for a quick call right now?', timestamp: 'Thu', isSentByMe: false, isRead: false },
  ],
  '14': [
    { id: '14-1', text: 'I hope you have a wonderful day!', timestamp: 'Aug 20', isSentByMe: false, isRead: true },
    { id: '14-2', text: 'Thank you, that means a lot!', timestamp: 'Aug 20', isSentByMe: true, isRead: true },
    { id: '14-3', text: 'Happy Birthday! 🎉 Wish you all the best!', timestamp: 'Aug 20', isSentByMe: true, isRead: true },
  ],
  '15': [
    { id: '15-1', text: 'You have to see this clip.', timestamp: 'Aug 19', isSentByMe: false, isRead: true },
    { id: '15-2', text: 'Send it over. I need something funny today.', timestamp: 'Aug 19', isSentByMe: true, isRead: true },
    { id: '15-3', text: 'Check out this video link, it\'s hilarious!', timestamp: 'Aug 19', isSentByMe: false, isRead: true },
  ],
  '16': [
    { id: '16-1', text: 'The flight prices went up this morning.', timestamp: 'Aug 18', isSentByMe: false, isRead: true },
    { id: '16-2', text: 'Let\'s book them before they increase again.', timestamp: 'Aug 18', isSentByMe: true, isRead: true },
    { id: '16-3', text: 'Perfect, I will lock in those flight tickets.', timestamp: 'Aug 18', isSentByMe: true, isRead: true },
  ],
  '17': [
    { id: '17-1', text: 'The new coffee shipment arrived today.', timestamp: 'Aug 17', isSentByMe: false, isRead: true },
    { id: '17-2', text: 'I am excited to try the lighter roast.', timestamp: 'Aug 17', isSentByMe: true, isRead: true },
    { id: '17-3', text: 'Leo: Anyone tried the new specialty espresso roast?', timestamp: 'Aug 17', isSentByMe: false, isRead: false },
  ],
  '18': [
    { id: '18-1', text: 'Are you joining the game tonight?', timestamp: 'Aug 15', isSentByMe: true, isRead: true },
    { id: '18-2', text: 'Yes, I just need to finish one thing first.', timestamp: 'Aug 15', isSentByMe: false, isRead: true },
    { id: '18-3', text: 'Game is starting in 10 minutes! Join Discord.', timestamp: 'Aug 15', isSentByMe: false, isRead: true },
  ],
  '19': [
    { id: '19-1', text: 'The help yesterday made a huge difference.', timestamp: 'Aug 12', isSentByMe: false, isRead: true },
    { id: '19-2', text: 'I am glad I could help. Let me know if you need anything else.', timestamp: 'Aug 12', isSentByMe: true, isRead: true },
    { id: '19-3', text: 'Thank you so much for your help yesterday!', timestamp: 'Aug 12', isSentByMe: false, isRead: true },
  ],
  '20': [
    { id: '20-1', text: 'The migration checklist is almost complete.', timestamp: 'Aug 10', isSentByMe: false, isRead: true },
    { id: '20-2', text: 'I will monitor the logs after the final step.', timestamp: 'Aug 10', isSentByMe: true, isRead: true },
    { id: '20-3', text: 'All setup completed for the server migration.', timestamp: 'Aug 10', isSentByMe: true, isRead: true },
  ],
};
