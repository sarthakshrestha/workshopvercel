import React from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CurriculumModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Curriculum</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Curriculum Information</DialogTitle>
          <DialogDescription>
            Learn more about our curriculum and approach.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="why">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="why">Introduction</TabsTrigger>
            <TabsTrigger value="vision">Our Vision</TabsTrigger>
            <TabsTrigger value="approach">Our Approach</TabsTrigger>
            <TabsTrigger value="overview">Course Overview</TabsTrigger>
          </TabsList>
          <TabsContent value="why">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-4"
            >
              <h3 className="text-lg font-semibold">
                Introduction to this program
              </h3>
              <p>
                In today’s rapidly evolving digital economy, it is crucial to
                equip our students with the skills they need to navigate and
                excel in this environment. Digital literacy, much like
                traditional literacy and numeracy, has become an essential
                skill. The sooner students begin developing these abilities, the
                better prepared they will be for the challenges and
                opportunities ahead
              </p>
              <p>
                {" "}
                The current IT education curriculum, while comprehensive, may
                not fully address the demands of the changing global digital
                landscape. With this vision in mind, we have introduced a
                mentorship programme tailored specifically for young students.
                This programme is designed not as a traditional classroom
                experience but as a hands-on, practical approach to becoming
                digitally skilled and literate.
              </p>

              <p>
                Our first initiative as you are aware was a hands-on,
                skills-based mentorship programme at The British College. The
                programme culminated in a collaborative software development
                project presented to college staff, IT industry representatives,
                and educationists. The project was met with accolades, and two
                students were immediately offered positions at Tulip
                Technologies. Today, 6 of the outstanding participants are
                employed by us. We have recently secured a contract to run the
                same at St Xavier’s College.{" "}
              </p>
              <p>
                {" "}
                Building on this success, and upon realisation and advice that
                such programmes should be introduced as early as possible, we
                decided to approach schools. We are pleased to have initiated
                this programme to Siddhartha Vanasthali Institute and Saurdeep
                Boarding School for classes 8, 9 and 10. The students are on a
                creative skill-enhancing journey of exploring Scratch, Figma,
                HTML, CSS, generative AI, and Cybersecurity.
              </p>
            </motion.div>
          </TabsContent>
          <TabsContent value="vision">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-4"
            >
              <h3 className="text-lg font-semibold">Our Vision and Ambition</h3>
              <p>
                Our ambition is to equip students with the tools they need to
                succeed in a digital world. By starting young, we ensure that
                they build a strong foundation of digital literacy that will
                serve them throughout their educational journey and beyond.
              </p>
              <p>
                We invite students and parents to embrace this opportunity to
                gain invaluable skills that will be crucial in the years to
                come. Together, we can pave the way for a future where our youth
                are not only prepared to face the digital landscape but are also
                empowered to excel within it and easily progress towards being
                an entrepreneur or making a career in it.
              </p>
            </motion.div>
          </TabsContent>
          <TabsContent value="approach">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-4"
            >
              <h3 className="text-lg font-semibold">Learning by Doing</h3>
              <p>
                Our philosophy is rooted in the belief that students learn best
                by doing. Therefore, our programme, which is run in a more
                workshop style, focuses on engaging students in skill
                development activities right from the start. This approach is
                more akin to teaching how to play the piano or the guitar rather
                than teaching subjects like physics or chemistry in a
                traditional classroom setting.
              </p>
              <h3 className="text-lg font-semibold">Why a workshop?</h3>
              <p>
                We have chosen to run this in a workshop style because we aim to
                foster an environment of active participation and practical
                learning. The workshops will be facilitated by young, skilled
                mentors with whom the students can relate well. Rather than
                teaching theoretical concepts, we emphasise real-world
                applications and interactive experiences aimed towards solving a
                problem. Students will be immersed in a variety of modules
                designed to develop essential digital skills in a dynamic and
                supportive setting.
              </p>
            </motion.div>
          </TabsContent>
          <TabsContent value="overview">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-4"
            >
              <h3 className="text-lg font-semibold">Course Overview</h3>
              <p>
                Generative AI has changed the way we search and retrieve
                information. The curriculum is divided into the following three
                main modules while Generative AI will be integrated into all
                modules:
              </p>
              <ul className="list-disc pl-5">
                <li>Scratch</li>
                <li>HTML/CSS Coding</li>
                <li>Cybersecurity</li>
              </ul>
              <p>
                The class duration will be 110 minutes once a week and will be
                imparted to classes 8, 9 and 10 over the academic year. The
                mentorship programme will help students connect with the IT
                world, learn how to use computers, and stay updated with current
                trends. It equips students with essential skills for the digital
                age, making them more confident and competent users of
                technology. In the current academic year, the workshop will
                cover Scratch programming, HTML/CSS coding, and cybersecurity,
                providing a well-rounded introduction to essential skills in
                technology and digital literacy.
              </p>
              <p>
                In the following year, the students that progress to classes 9
                and 10 will be taught programming languages such as Python.
              </p>
            </motion.div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CurriculumModal;
