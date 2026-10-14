import object from "framework/objects/object.js";
import state from "layouts/state.js";
import nexd from "adtag/nexd.js";
import ctaHandler from "adtag/utils/ctaHandler";
import image from "framework/objects/image.js";
import mesh from "framework/objects/mesh.js";
import animator from "framework/behaviors/animator.js";
import deviceSensors from "framework/utils/deviceSensors.js";
import glutils from "framework/utils/glUtils.js";
import analytics from "adtag/utils/analytics.js";
import quad from "framework/objects/quad.js";
import gesture from 'framework/objects/gesture.js';
import timeline from 'framework/behaviors/timeline.js';

const SETTINGS = {
  direction: "right",
  entrytime: 1500,
  zoomscale: 1200 / 1e3,
  baserotate: {
    x: 0,
    y: -Math.PI * 0.5,
    z: 0,
  },
  basescale: 15.5,
  hoveramount: 15,
  hovertime: 3e3,
  wiggleamount: Math.PI / 4,
  wiggletime: 4e3,
  spins: 5,
  spintime: 4e3,
  inertia: 20,
  logoposy: -280,
  logoscale: 1,
  itemposy: 60,
};

function move(source, target, timedelta) {
  if (timedelta > 100) timedelta = 100;
  let dir = 1;
  if (source > target) dir = -1;
  let move_delta =
    ((-dir * timedelta) / (SETTINGS.inertia * 16.66)) *
    Math.abs(source - target);
  source = source - move_delta;
  if (dir == 1 && source > target) source = target;
  if (dir == -1 && source < target) source = target;
  return source;
}

/**
 * Documentation and examples: https://adcanvasprojects.atlassian.net/wiki/spaces/devtool/
 */
export default {
  /** @param {DevtoolSettings} settings */
  new: function (settings) {
    const fw = nexd.framework;
    const gl = nexd.framework.gl;

    state.buildState(settings);

    const viewWidth = fw.viewWidth;
    const viewHeight = fw.viewHeight;

    const instance = object.new();
    instance.add(image.new(settings.assets.bg_image.uri));

    const logo = instance.add(image.new(settings.assets.logo.uri));
    logo.position.y = SETTINGS.logoposy;
    logo.scale.sc = SETTINGS.logoscale;

    let firsttouch = true;
    let startPos = null;
    let snowScale = 0;
    let update = {
      roratex: null,
      rotatey: null,
    };

    const itemcontainer1 = instance.add(object.new("itemcontainer 1"));
    const itemcontainer2 = itemcontainer1.add(object.new("itemcontainer 2"));
    const itemcontainer3 = itemcontainer2.add(object.new("itemcontainer 3"));
    itemcontainer3.add(makeSnowLayer(settings.assets.snow.uri));

    const item = itemcontainer3.add(
      mesh.new(settings.assets.purk.uri, settings.assets.texture.uri),
    );

    item.position.y = SETTINGS.itemposy;
    item.rotate.x = SETTINGS.baserotate.x;
    item.rotate.y = SETTINGS.baserotate.y;
    item.rotate.z = SETTINGS.baserotate.z;
    item.scale.sc = SETTINGS.basescale;

    instance.relativePress = (x, y) => {
      hideGesture();
      snowScale = 2;

      if (firsttouch) {
        firsttouch = false;
        analytics.sendEvent("send", "event", "Click");
      }

      startPos = {
        x: x,
        y: y,
        rotatex: itemcontainer2.rotate.x,
        rotatey: itemcontainer2.rotate.y,
      };

      itemcontainer2.anim.stop();
      itemcontainer2.anim.animate(itemcontainer2.scale, {
        sc: SETTINGS.zoomscale,
        time: 500,
        ease: animator.inOutQuad,
      });
      itemcontainer3.anim.stop();
    };

    instance.relativeDrag = (x, y) => {
      if (startPos == null) return;
      const dx = startPos.x - x;
      const dy = startPos.y - y;
      update.rotatex = startPos.rotatex + dy / 300;
      update.rotatey = startPos.rotatey + dx / 300;
    };

    instance.relativeRelease = (x, y) => {
      snowScale = 0;

      if (startPos == null) return;
      startPos = null;

      itemcontainer2.anim.stop();
      itemcontainer2.anim.animate(itemcontainer2.scale, {
        sc: 1,
        time: 500,
        ease: animator.inOutQuad,
      });
      itemcontainer3.anim.stop();

      hover();
      wiggle();
    };

    instance.step = (timedelta) => {
      if (update.rotatex != null) {
        itemcontainer2.rotate.x = move(
          itemcontainer2.rotate.x,
          update.rotatex,
          timedelta,
        );
      }

      if (update.rotatey != null) {
        itemcontainer2.rotate.y = move(
          itemcontainer2.rotate.y,
          update.rotatey,
          timedelta,
        );
      }
    };

    function hover() {
      if (startPos != null) return;

      let h = SETTINGS.hoveramount;
      if (itemcontainer3.position.y > 0) h = h * -1;
      itemcontainer3.anim.animate(itemcontainer3.position, {
        y: h,
        time: SETTINGS.hovertime,
        ease: animator.inOutQuad,
        onComplete: item.hover,
      });
    }

    function wiggle() {
      if (startPos != null) return;

      let w = SETTINGS.wiggleamount;
      if (itemcontainer3.rotate.y > 0) w = w * -1;
      itemcontainer3.anim.animate(itemcontainer3.rotate, {
        y: w,
        time: SETTINGS.wiggletime,
        ease: animator.inOutQuad,
        onComplete: () => wiggle(),
      });
    }

    if (SETTINGS.direction == "left") {
      itemcontainer1.position.x = -viewWidth;
      itemcontainer1.rotate.y = Math.PI * SETTINGS.spins;
    } else if (SETTINGS.direction == "right") {
      itemcontainer1.position.x = viewWidth;
      itemcontainer1.rotate.y = -Math.PI * SETTINGS.spins;
    } else if (SETTINGS.direction == "up") {
      itemcontainer1.position.y = -viewHeight;
      itemcontainer1.rotate.x = Math.PI * SETTINGS.spins;
    } else if (SETTINGS.direction == "down") {
      itemcontainer1.position.y = viewHeight;
      itemcontainer1.rotate.x = -Math.PI * SETTINGS.spins;
    }

    itemcontainer1.anim.animate(itemcontainer1.rotate, {
      x: 0,
      y: 0,
      z: 0,
      time: SETTINGS.spintime,
      ease: animator.outElastic,
      onComplete: () => wiggle(),
    });

    itemcontainer1.anim.animate(itemcontainer1.position, {
      x: 0,
      time: SETTINGS.entrytime,
      ease: animator.outQuad,
      onComplete: () => {
        hover();
        setTimeout(() => {
          showGesture();
        }, 500)
      },
    });

    // example click
    // instance.focusedClick = function () {
    //   ctaHandler.openLink();
    // };

    const gesture = instance.add(image.new(settings.assets.gesture.uri));
    gesture.alpha = 0;

    function showGesture() {
      if (!gesture) return;
      gesture.anim.animate(gesture, {
        alpha: 1,
        time: 500,
        ease: animator.inOutQuad,
        onComplete: () => {
          animateGesture()
        },
      });
    }

    function hideGesture() {
      if (!gesture) return;
      gesture.anim.animate(gesture, {
        alpha: 0,
        time: 500,
        ease: animator.inOutQuad,
        onComplete: () => {
          if (!gesture) return;
          gesture.removeSelf()
        },
      });
    }

    function animateGesture() {
      if (!gesture) return;

      const tl = timeline.new({
        id: new Date().valueOf(),
        loop: 'normal',
        duration: 3500,
        trigger: {
          event: 'adloaded',
          element: null,
          interaction: null,
        },
      });

      // default gesture behaviour where we move the gesture
      const gestureTrack = tl.addTrack({
        target: {
          property: 'position',
          element: gesture,
          axis: 'x',
        },
      });

      // move to left
      gestureTrack.addKeyframe({ time: 500, ease: 'linear', value: -viewWidth * .2 });
      // move to right
      gestureTrack.addKeyframe({ time: 1500, ease: 'linear', value: viewWidth * .2 });
      // move to center
      gestureTrack.addKeyframe({ time: 2000, ease: 'linear', value: 0 });

    }

    function makeSnowLayer(imagefile) {
      const count = 2000;

      deviceSensors.startSensors();
      const VSHADER_SOURCE =
        "attribute vec3 a_Position;\n" +
        "attribute float a_rand;\n" +
        "attribute float a_start;\n" +
        "uniform mat4 u_projection; \n" +
        "uniform mat4 u_view; \n" +
        "uniform mat4 u_model; \n" +
        "uniform float u_time; \n" +
        "uniform float u_widthRatio; \n" +
        "varying float v_rand;\n" +
        "varying float v_dist;\n" +
        "void main() {\n" +
        "    vec3 dir = normalize(a_Position)/100.0;\n" +
        "    float y = -fract(dir.y*u_time*10.)*sign(dir.y);\n" +
        "    float x = fract(dir.x*u_time*10.)*sign(dir.x);\n" +
        "    float z = fract(dir.z*u_time*10.)*sign(dir.z)*20.;\n" +
        "    gl_Position = u_projection*u_view*u_model * (vec4(x, y, z, 1.0));\n" +
        "  gl_PointSize = 4.0 + pow((1.0 - fract(a_rand + a_Position.z)), 4.0)*30.0*u_widthRatio;\n" +
        "  v_dist = distance(gl_Position.xyz, vec3(0.0))/200.0;\n" +
        "  v_rand = a_rand;\n" +
        "}\n";
      const FSHADER_SOURCE =
        "precision mediump float;\n" +
        "varying float v_rand;\n" +
        "varying float v_dist;\n" +
        "uniform sampler2D u_texture;\n" +
        "uniform float u_alpha;\n" +
        "void main() {\n" +
        "  vec4 color = vec4(texture2D(u_texture, gl_PointCoord)); if(color.a < 0.1) discard; \n" +
        "  gl_FragColor = vec4(0.8, 0., 0., max(0.0, 1.0 - v_dist)*color.a*u_alpha*(0.7 + 0.3*v_rand));\n" +
        "}\n";
      const vertex = {
        text: VSHADER_SOURCE,
        type: "x-shader/x-vertex",
      };
      const fragment = {
        text: FSHADER_SOURCE,
        type: "x-shader/x-fragment",
      };
      const vertexShader = glutils.createShader(gl, vertex);
      const fragmentShader = glutils.createShader(gl, fragment);
      const glProgram = glutils.loadProgram(
        gl,
        [vertexShader, fragmentShader],
        ["a_Position", "a_start", "a_rand"],
        [
          "u_projection",
          "u_view",
          "u_model",
          "u_texture",
          "u_alpha",
          "u_time",
          "u_widthRatio",
        ],
      );

      let verts = [];
      let rands = [];

      const particleCount = count;
      for (let i = 0; i < particleCount; i++) {
        const r = Math.random() * 0.5 + 0.5;
        const angle1 = Math.random() * Math.PI * 2;
        const angle2 = Math.random() * Math.PI * 2;
        verts.push(Math.cos(angle1) * Math.sin(angle2) * r);
        verts.push(Math.sin(angle1) * Math.sin(angle2) * r * 0.6);
        verts.push(Math.cos(angle2) * r * 10);
        rands.push(Math.random());
      }

      verts = Array.from(new Float32Array(verts));
      rands = Array.from(new Float32Array(rands));

      function initVertexBuffers(gl) {
        gl.uniformMatrix4fv(
          glProgram.u_projection_handle,
          false,
          snow.projectionMatrix,
        );
        gl.uniformMatrix4fv(glProgram.u_view_handle, false, snow.viewMatrix);
        gl.uniformMatrix4fv(
          glProgram.u_model_handle,
          false,
          snow.quadModelMatrix,
        );
        if (!initArrayBuffer(gl, "a_Position", verts, 3, gl.FLOAT)) return -1;
        if (!initArrayBuffer(gl, "a_rand", rands, 1, gl.FLOAT)) return -1;
        return particleCount;
      }

      function initArrayBuffer(gl, attribute, data, num, type) {
        var buffer = gl.createBuffer();
        buffer.itemSize = num;
        buffer.numItems = particleCount;
        if (!buffer) {
          console.error("Failed to create the buffer object");
          return false;
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        var a_attribute = gl.getAttribLocation(glProgram.program, attribute);
        if (a_attribute < 0) {
          console.error("Failed to get the storage location of " + attribute);
          return false;
        }
        gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
        gl.enableVertexAttribArray(a_attribute);
        return true;
      }

      const snow_image = image.new(imagefile);
      const snow = quad.new();

      let counter = 180;

      snow.draw = function () {
        if (!snow_image.texture) {
          return;
        }

        gl.useProgram(glProgram.program);
        initVertexBuffers(gl);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, snow_image.texture);
        gl.uniform1i(glProgram.u_texture_handle, 0);
        gl.uniform1f(glProgram.u_time_handle, counter);
        gl.uniform1f(
          glProgram.u_widthRatio_handle,
          nexd.framework.glcanvas.clientWidth / nexd.framework.viewWidth,
        );
        gl.uniform1f(glProgram.u_alpha_handle, this.absolutealpha());
        gl.drawArrays(gl.POINTS, 0, particleCount);
      };

      snowScale = 0;
      snow.step = (td) => {
        nexd.framework.renderRequired = true;
        counter += 0.02;
        const sc = move(snow.scale.x, snowScale, td);
        snow.set({ sc });
      };

      snow.set({ sc: 0 });
      return snow;
    }

    return instance;
  },
};
