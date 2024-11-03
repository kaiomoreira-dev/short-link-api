import { Injectable } from "@nestjs/common";
import * as Sentry from "@sentry/nestjs"
import { nodeProfilingIntegration } from "@sentry/profiling-node";

@Injectable()
export class SentryIntegration {
  constructor() {
    Sentry.init({
        dsn: "https://2934ff699e02ce65514ba94bd0ea9cfd@o1040442.ingest.us.sentry.io/4508235940298752",
        integrations: [
          nodeProfilingIntegration(),
        ],
        // Tracing
        tracesSampleRate: 1.0, //  Capture 100% of the transactions
      
        // Set sampling rate for profiling - this is relative to tracesSampleRate
        profilesSampleRate: 1.0,
      });;
  }

}
