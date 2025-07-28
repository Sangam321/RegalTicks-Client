import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useGetCreatorWatchQuery } from "@/features/api/watchApi";
import { BookOpen, DollarSign, Edit, Eye, FileText, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WatchTable = () => {
  const { data, isLoading } = useGetCreatorWatchQuery();
  const navigate = useNavigate();
  const primaryColor = '#146321';

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4">
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"
          style={{ borderColor: primaryColor }}
        ></div>
        <h1 className="text-lg font-medium text-gray-600 dark:text-gray-400">Loading...</h1>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: primaryColor + '20' }}
            >
              <BookOpen className="w-6 h-6" style={{ color: primaryColor }} />
            </div>
            Watch Management
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage and track all sales.
          </p>
        </div>

        <Button
          onClick={() => navigate(`create`)}
          className="text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 px-6 py-3"
          style={{
            backgroundColor: primaryColor,
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#0d4a1a';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = primaryColor;
            e.target.style.transform = 'translateY(0)';
          }}
        >
          <Plus className="w-4 h-4" />
          Add a new watch
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total watches created</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {data?.watchs?.length || 0}
              </p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div
          className="rounded-lg p-4 border text-white"
          style={{
            background: `linear-gradient(135deg, ${primaryColor} 0%, #0d4a1a 100%)`,
            borderColor: primaryColor
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/90">Published</p>
              <p className="text-2xl font-bold text-white">
                {data?.watchs?.filter(watch => watch.isPublished).length || 0}
              </p>
            </div>
            <Eye className="w-8 h-8 text-white/80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Drafts</p>
              <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
                {data?.watchs?.filter(watch => !watch.isPublished).length || 0}
              </p>
            </div>
            <FileText className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Enhanced Table Container */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <Table>
          <TableCaption className="text-gray-500 dark:text-gray-400 py-4 text-sm bg-gray-50 dark:bg-gray-700/30">
            List of uploaded watch.
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <TableHead className="w-[100px] font-semibold text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Price
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                Status
              </TableHead>
              <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                Title
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700 dark:text-gray-300">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.watchs.map((watch) => (
              <TableRow
                key={watch._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-all duration-150 border-b border-gray-100 dark:border-gray-700"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: watch?.watchPrice ? primaryColor : '#gray' }}
                    ></div>
                    <span className="text-gray-900 dark:text-white">
                      {watch?.watchPrice || "NA"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={`font-medium transition-all duration-200 ${watch.isPublished
                      ? 'text-white shadow-sm'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 hover:bg-yellow-200'
                      }`}
                    style={watch.isPublished ? { backgroundColor: primaryColor } : {}}
                  >
                    {watch.isPublished ? (
                      <>
                        <Eye className="w-3 h-3 mr-1" />
                        Published
                      </>
                    ) : (
                      <>
                        <FileText className="w-3 h-3 mr-1" />
                        Draft
                      </>
                    )}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {watch.watchTitle}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      ID: {watch._id.slice(-8)}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size='sm'
                    variant='ghost'
                    onClick={() => navigate(`${watch._id}`)}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 rounded-lg p-2"
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = primaryColor + '20';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Empty State (if no watchs) */}
      {data?.watchs?.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/30 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-600">
          <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No watches available
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Start by add ing first watch
          </p>
          <Button
            onClick={() => navigate(`create`)}
            className="text-white px-6 py-2"
            style={{ backgroundColor: primaryColor }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add a new watch
          </Button>
        </div>
      )}
    </div>
  );
};

export default WatchTable;