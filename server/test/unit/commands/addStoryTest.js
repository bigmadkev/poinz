import {v4 as uuid} from 'uuid';
import {EXPECT_UUID_MATCHING, prepOneUserInOneRoom} from '../testUtils';

test('Should produce storyAdded and storySelected event (since it is the first story added to the room)', async () => {
  const {userId, roomId, processor} = await prepOneUserInOneRoom();

  const commandId = uuid();
  return processor(
    {
      id: commandId,
      roomId,
      name: 'addStory',
      payload: {
        title: 'SuperStory 232',
        description: 'This will be awesome'
      }
    },
    userId
  ).then(({producedEvents}) => {
    expect(producedEvents).toMatchEvents(commandId, roomId, 'storyAdded', 'storySelected');

    const [storyAddedEvent, storySelectedEvent] = producedEvents;

    expect(storyAddedEvent.payload).toMatchObject({
      title: 'SuperStory 232',
      description: 'This will be awesome',
      estimations: {}
    });
    expect(storySelectedEvent.payload).toMatchObject({
      storyId: EXPECT_UUID_MATCHING
    });
  });
});

test('Should produce storyAdded event', async () => {
  const {userId, roomId, processor} = await prepOneUserInOneRoom();

  const commandId = uuid();

  // adding two stories
  return processor(
    {
      id: commandId,
      roomId,
      name: 'addStory',
      payload: {
        title: 'SuperStory 111'
      }
    },
    userId
  )
    .then(() =>
      processor(
        {
          id: commandId,
          roomId,
          name: 'addStory',
          payload: {
            title: 'SuperStory 222',
            description: 'This will be awesome'
          }
        },
        userId
      )
    )
    .then(({producedEvents, room}) => {
      expect(producedEvents).toMatchEvents(commandId, roomId, 'storyAdded');

      const [storyAddedEvent] = producedEvents;

      expect(storyAddedEvent.payload).toMatchObject({
        title: 'SuperStory 222',
        description: 'This will be awesome',
        estimations: {}
      });

      expect(room.stories[producedEvents[0].payload.id]).toBeDefined();
      expect(Object.values(room.stories).length).toBe(2);
    });
});

test('users excluded from estimations can still add stories', async () => {
  const {userId, roomId, processor, mockRoomsStore} = await prepOneUserInOneRoom();

  mockRoomsStore.manipulate((room) => room.setIn(['users', userId, 'excluded'], true));

  const commandId = uuid();
  return processor(
    {
      id: commandId,
      roomId,
      name: 'addStory',
      payload: {
        title: 'SuperStory 232',
        description: 'This will be awesome'
      }
    },
    userId
  ).then(({producedEvents}) =>
    expect(producedEvents).toMatchEvents(commandId, roomId, 'storyAdded', 'storySelected')
  );
});
