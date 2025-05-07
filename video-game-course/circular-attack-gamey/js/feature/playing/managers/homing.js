(function (window, opspark, _) {
  const Proton = window.Proton;

  // create a namespace for the homing manager //
  _.set(
    opspark,
    "playa.homing",
    /**
     * Creates and returns the homing manager.
     */
    function (assets, fx, messenger) {
      const active = [],
        objects = [],
        pool = {
          active,
          objects,

          get: function () {
            if (objects.length > 0) {
              return objects.pop();
            }
            return makeObject();
          },

          recycle: function (object) {
            messenger.dispatch({
              type: "POOL",
              bodies: [object],
              source: "homing",
            });
            // remove object from the active Array //
            const i = active.indexOf(object);
            if (i > -1) {
              active.splice(i, 1);
            }

            // reset and pool the object off the stage //
            object.x = -object.width;
            object.alpha = 1;
            object.scaleX = object.scaleY = 1;
            objects.push(object);
          },
        },
        homingManager = {
          getNumberActive() {
            return active.length;
          },
          spawn(number = 1) {
            const spawned = [];
            for (let i = 0; i < number; i++) {
              spawned.push(pool.get());
            }
            active.push(...spawned);
            messenger.dispatch({
              type: "SPAWN",
              bodies: spawned,
              source: "homing",
            });
            return this;
          },
        };

      function makeObject() {
        const homing = assets.makeHoming();
        homing.handleCollision = handleCollision;
        return homing;
      }

      function handleCollision(impact, body) {
        // don't handle collisions between orbs //
        if (body.type === this.type) return;

        /*
         * Because the explosion is async, the homing may exist
         * but have already exploded, so check first to see
         * if it has integrity before running check to exlode.
         */
        if (this.integrity > 0) {
          if (body.type === "ship") {
            this.integrity = 0;
          }
          console.log(impact);
          this.integrity -= impact;
          if (this.integrity <= 0) {
            fx.makeEmitter(2, 3, "rgba(214, 36, 84, 0.2)", null, [
              new Proton.RandomDrift(5, 0, 0.35),
            ]).emit({ x: this.x, y: this.y }, 0.5);
            pool.recycle(this);
            messenger.dispatch({
              type: "EXPLOSION",
              source: "homing",
              target: this,
              incoming: body,
            });
            console.log("ship", assets);
          }
        }
      }

      // return homing manager api //
      return homingManager;
    }
  );
})(window, window.opspark, window._);
