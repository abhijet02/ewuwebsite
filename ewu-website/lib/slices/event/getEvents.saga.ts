import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetEventsAction } from "./event.type";
import { eventActions } from "./event.slice";
import { eventService } from "@lib/services/event/event.service";
import { GetEventsResponse } from "@lib/services/event/event.service.type";

function* getEventSaga(action: GetEventsAction) {
  try {
    const response: Response<GetEventsResponse> = yield call(
      eventService.getEvents,
      action.payload.request
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      eventActions.getEventsSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      eventActions.getEventsFailure({
        error: errorMessage || "Get events failed",
      })
    );
  } finally {
  }
}

export function* getEventsWatcherSaga() {
  yield takeLatest(eventActions.getEvents.type, getEventSaga);
}
