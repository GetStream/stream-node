import { VideoApi } from './gen/video/VideoApi';
import { StreamCall } from './StreamCall';

export class StreamVideoClient extends VideoApi {
  call = (type: string, id: string) => {
    return new StreamCall(this, type, id);
  };
}
