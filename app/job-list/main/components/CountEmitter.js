/**
 * Created by leo on 12/5/2017.
 */
import { EventEmitter } from 'events';
class CountEmitter extends EventEmitter {
}
const JobCountEmitter = new CountEmitter();
export default JobCountEmitter;
